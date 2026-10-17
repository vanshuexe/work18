/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  outputFileTracingIncludes: {
    "/*": ["./data/*.json"],
  },
};
export default nextConfig;
