/** @type {import('next').NextConfig} */
const config = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  transpilePackages: ["@leaf/core"],
  poweredByHeader: false,
};
export default config;
