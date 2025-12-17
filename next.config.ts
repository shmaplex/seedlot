import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const packageJson = require("./package.json");

const nextConfig: NextConfig = {
  env: {
    APP_VERSION: packageJson.version,
  },
  // experimental: {
  //   authInterrupts: true,
  // },
  images: {
    // WARNING: Enabling this will mess up the avatar service images
    // loader: "custom",
    // loaderFile: "./lib/supabase-image-loader.ts",
    remotePatterns: [
      { protocol: "https", hostname: "api.dicebear.com", pathname: "/7.x/**" },
      {
        protocol: "https",
        hostname: "mlarbhgbebwugbdpxreu.supabase.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.shmaplex.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.producthunt.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "gitlab.com",
        pathname: "/uploads/-/system/**",
      },
      { protocol: "https", hostname: "pbs.twimg.com", pathname: "/**" },
      { protocol: "https", hostname: "graph.facebook.com", pathname: "/**" },
    ],
    dangerouslyAllowSVG: true, // ⚠ Only use if you trust the image source
    contentSecurityPolicy: "default-src 'self'; img-src *; media-src *",
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
