export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { installEmudhraDistrust } = await import(
      "./security/emudhra-default-ca.mjs"
    );
    installEmudhraDistrust();
    await import("./sentry.server.config");
  } else if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}
