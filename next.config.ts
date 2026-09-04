import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
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
