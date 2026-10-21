import assert from "node:assert/strict";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { once } from "node:events";
import { channel } from "node:diagnostics_channel";
import { X509Certificate } from "node:crypto";
import tls from "node:tls";
import { installEmudhraDistrust } from "../apps/nextjs/security/emudhra-default-ca.mjs";

const trust = installEmudhraDistrust();
const require = createRequire(
  new URL("../apps/nextjs/package.json", import.meta.url),
);
const axios = require("axios");
const { createClient } = require("@supabase/supabase-js");
assert.ok(trust.after > 0);
assert.ok(trust.after <= trust.before);
assert.deepEqual(installEmudhraDistrust(), trust);
const affected = new Set([
  "7DD78D5F4F13459A83DFF9ABBBA62EDBAF6F2D102BF257FD712F4D9F2746ED8D",
  "F2EDAAFF3D9B701FB4D14C9F285F8C0BAD90FC3BCC1FA07D47F4718EDABA34A5",
  "D7A7A0FB5D7E2731D771E9484EBCDEF71D5F0C3E0A2948782BC83EE0EA699EF4",
  "86A1ECBA089C4A8D3BBE2734C612BA341D813E043CF9E8A862CD5C57A36BBE6B",
]);
for (const pem of tls.getCACertificates("default")) {
  assert.ok(
    !affected.has(new X509Certificate(pem).fingerprint256.replaceAll(":", "")),
  );
}
const server = createServer((request, response) => {
  response.setHeader("content-type", "application/json");
  if (request.url === "/rest/v1/probe?select=*") response.end('[{"id":1}]');
  else
    response.end(JSON.stringify({ method: request.method, path: request.url }));
});
server.listen(0, "127.0.0.1");
await once(server, "listening");
try {
  const origin = `http://127.0.0.1:${server.address().port}`;
  const result = await axios.get(`${origin}/contract`, {
    proxy: false,
    timeout: 5000,
  });
  assert.deepEqual(result.data, { method: "GET", path: "/contract" });
  const supabase = createClient(origin, "scouting-security-probe", {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
  const { data, error } = await supabase.from("probe").select();
  assert.equal(error, null);
  assert.deepEqual(data, [{ id: 1 }]);
} finally {
  server.closeAllConnections();
  await new Promise((resolve, reject) =>
    server.close((error) => (error ? reject(error) : resolve())),
  );
}
console.log(
  JSON.stringify({ runtime: process.version, trust, contracts: "passed" }),
);

if (process.argv.includes("--network")) {
  const targets = [
    ["https://dv-g3b-emudhra.we-have-a-problem.com", "certificate_rejected"],
    [
      "https://dv-g3b-aaa-emudhra.we-have-a-problem.com",
      "certificate_rejected",
    ],
    ["https://example.com", "accepted"],
  ];
  const certificateErrors = new Set([
    "UNABLE_TO_GET_ISSUER_CERT_LOCALLY",
    "UNABLE_TO_VERIFY_LEAF_SIGNATURE",
    "CERT_UNTRUSTED",
    "CERT_REJECTED",
    "CERT_REVOKED",
    "SELF_SIGNED_CERT_IN_CHAIN",
  ]);
  const results = [];
  for (const api of ["axios", "fetch", "supabase"]) {
    for (const [url, expected] of targets) {
      let result;
      for (let attempt = 1; attempt <= 3; attempt++) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 19000);
        let observedCode;
        let observedStatus;
        const errors = channel("undici:request:error");
        const headers = channel("undici:request:headers");
        const onError = (message) => {
          observedCode = message.error?.code;
        };
        const onHeaders = (message) => {
          observedStatus = message.response.statusCode;
        };
        errors.subscribe(onError);
        headers.subscribe(onHeaders);
        try {
          if (api === "axios") {
            const response = await axios.get(url, {
              signal: controller.signal,
              timeout: 19000,
              proxy: false,
              maxRedirects: 0,
              validateStatus: () => true,
            });
            observedStatus = response.status;
          } else if (api === "fetch") {
            const response = await fetch(url, {
              signal: controller.signal,
              redirect: "manual",
            });
            observedStatus = response.status;
            await response.body?.cancel();
          } else {
            const supabase = createClient(url, "scouting-security-probe", {
              auth: {
                persistSession: false,
                autoRefreshToken: false,
                detectSessionInUrl: false,
              },
            });
            await supabase
              .from("probe")
              .select()
              .abortSignal(controller.signal);
          }
        } catch (error) {
          observedCode = error.cause?.code ?? error.code ?? observedCode;
        } finally {
          clearTimeout(timer);
          errors.unsubscribe(onError);
          headers.unsubscribe(onHeaders);
        }
        const outcome = observedStatus
          ? "accepted"
          : certificateErrors.has(observedCode)
            ? "certificate_rejected"
            : "inconclusive";
        result = {
          api,
          url,
          expected,
          outcome,
          code: observedCode,
          status: observedStatus,
          attempt,
        };
        console.log(JSON.stringify(result));
        if (outcome !== "inconclusive") break;
      }
      results.push(result);
    }
  }
  assert.ok(
    results.every((result) => result.outcome === result.expected),
    "TLS contract did not pass; acceptance and network errors are not rejection",
  );
}
