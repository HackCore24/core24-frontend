/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s0.bloknot-volgograd.ru",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "as2.ftcdn.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s3-alpha-sig.figma.com",
        port: "",
        pathname: "/**",
      },

      {
        protocol: "https",
        hostname: "novostroikispb.ru",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
