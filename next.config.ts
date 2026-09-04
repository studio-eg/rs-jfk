import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  // Next's built-in image optimizer needs to self-fetch the image to resize it,
  // which doesn't work reliably from inside a Cloudflare Worker (no sharp, no
  // simple loopback fetch) — it 404s with "upstream response is invalid".
  // Serving the original file directly avoids this; there's no separate
  // image-resizing service configured for this project.
  images: { unoptimized: true },
  turbopack: {
    resolveAlias: {
      "drizzle-kit/api": "./cloudflare-shims/drizzle-kit-api.ts",
    },
  },
  // The local D1 simulator (miniflare) is a single-threaded Durable Object —
  // running static-page generation across multiple parallel workers causes
  // intermittent "D1_ERROR: Failed to parse body as JSON" build failures
  // under concurrent queries, especially now that every global/page carries
  // the pageSections blocks field (a much larger per-doc query). Building
  // single-threaded avoids the local-only race; real Cloudflare D1 in
  // production isn't affected by this.
  experimental: { cpus: 1 },
  // Packages with Cloudflare Workers (workerd) specific code.
  // Read more: https://opennext.js.org/cloudflare/howtos/workerd
  serverExternalPackages: ["jose"],
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      ".cjs": [".cts", ".cjs"],
      ".js": [".ts", ".tsx", ".js", ".jsx"],
      ".mjs": [".mts", ".mjs"],
    };

    return webpackConfig;
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
