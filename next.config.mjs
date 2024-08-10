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
    ],
  },
};

export default nextConfig;
