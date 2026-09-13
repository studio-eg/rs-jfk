import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { sqliteD1Adapter } from "@payloadcms/db-d1-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { r2Storage } from "@payloadcms/storage-r2";
import {
  CloudflareContext,
  getCloudflareContext,
} from "@opennextjs/cloudflare";
import type { GetPlatformProxyOptions } from "wrangler";

import { Users } from "./payload/collections/Users";
import { Media } from "./payload/collections/Media";
import { Posts } from "./payload/collections/Posts";
import { Pages } from "./payload/collections/Pages";
import { Header } from "./payload/globals/Header";
import { Home } from "./payload/globals/Home";
import { Schulprofil } from "./payload/globals/Schulprofil";
import { Angebot } from "./payload/globals/Angebot";
import { Organisatorisches } from "./payload/globals/Organisatorisches";
import { Personen } from "./payload/globals/Personen";
import { Kontakt } from "./payload/globals/Kontakt";
import { Impressum } from "./payload/globals/Impressum";
import { Datenschutz } from "./payload/globals/Datenschutz";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const realpath = (value: string) =>
  fs.existsSync(value) ? fs.realpathSync(value) : undefined;

const isCLI = process.argv.some((value) =>
  realpath(value)?.endsWith(path.join("payload", "bin.js"))
);
const isProduction = process.env.NODE_ENV === "production";

const createLog =
  (level: string, fn: typeof console.log) =>
  (objOrMsg: object | string, msg?: string) => {
    if (typeof objOrMsg === "string") {
      fn(JSON.stringify({ level, msg: objOrMsg }));
    } else {
      fn(
        JSON.stringify({
          level,
          ...objOrMsg,
          msg: msg ?? (objOrMsg as { msg?: string }).msg,
        })
      );
    }
  };

const cloudflareLogger = {
  level: process.env.PAYLOAD_LOG_LEVEL || "info",
  trace: createLog("trace", console.debug),
  debug: createLog("debug", console.debug),
  info: createLog("info", console.log),
  warn: createLog("warn", console.warn),
  error: createLog("error", console.error),
  fatal: createLog("fatal", console.error),
  silent: () => {},
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any; // Use PayloadLogger type when it's exported

// Local dev / CLI (e.g. `payload migrate`) get D1/R2 bindings from wrangler's
// local simulation via getPlatformProxy(). Production reads real bindings via
// getCloudflareContext() (populated by the OpenNext Cloudflare adapter).
const cloudflare =
  isCLI || !isProduction
    ? await getCloudflareContextFromWrangler()
    : await getCloudflareContext({ async: true });

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Posts, Pages],
  globals: [
    Header,
    Home,
    Schulprofil,
    Angebot,
    Organisatorisches,
    Personen,
    Kontakt,
    Impressum,
    Datenschutz,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: sqliteD1Adapter({ binding: cloudflare.env.D1 }),
  logger: isProduction ? cloudflareLogger : undefined,
  plugins: [
    r2Storage({
      bucket: cloudflare.env.R2,
      collections: { media: true },
    }),
  ],
});

// Adapted from https://github.com/opennextjs/opennextjs-cloudflare/blob/main/packages/cloudflare/src/api/cloudflare-context.ts
function getCloudflareContextFromWrangler(): Promise<CloudflareContext> {
  return import(
    /* webpackIgnore: true */ `${"__wrangler".replaceAll("_", "")}`
  ).then(({ getPlatformProxy }) =>
    getPlatformProxy({
      environment: process.env.CLOUDFLARE_ENV,
      remoteBindings: isProduction,
    } satisfies GetPlatformProxyOptions)
  );
}
