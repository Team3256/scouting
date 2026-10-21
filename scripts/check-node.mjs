const [major, minor, patch] = process.versions.node.split(".").map(Number);
const supported =
  (major === 22 && (minor > 23 || (minor === 23 && patch >= 4))) ||
  (major === 24 && (minor > 22 || (minor === 22 && patch >= 1))) ||
  (major === 26 && (minor > 12 || (minor === 12 && patch >= 1))) ||
  major > 26;
if (!supported) {
  throw new Error(
    "Use Node.js ^22.23.4 || ^24.22.1 || >=26.12.1 with the eMudhra trust update.",
  );
}
