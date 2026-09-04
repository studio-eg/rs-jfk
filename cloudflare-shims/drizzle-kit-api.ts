// drizzle-kit is a Node-only CLI build tool (`payload migrate:create`/`push`), never
// invoked while actually serving requests. Payload's D1 adapter still references it via
// a dynamic `require("drizzle-kit/api")` deep inside its lazy migration-generation code
// path, which drags real drizzle-kit (and its Node-only internals) into the Cloudflare
// Worker bundle otherwise. This throwing shim replaces it for the Worker build only —
// the real CLI commands run as plain Node processes and never load this file.
function unavailable(): never {
  throw new Error("drizzle-kit is not available in the Cloudflare Worker runtime");
}

export const generateSQLiteDrizzleJson = unavailable;
export const generateSQLiteMigration = unavailable;
export const pushSQLiteSchema = unavailable;
