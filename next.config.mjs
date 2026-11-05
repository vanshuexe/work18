/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    agentUpgrade: "security",
  },
  poweredByHeader: false,
  outputFileTracingIncludes: {
    "/*": ["./data/*.json"],
  },
};
export default nextConfig;
