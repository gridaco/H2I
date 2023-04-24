/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["h2i"],
  async rewrites() {
    const docs = process.env.NEXT_PUBLIC_DOCS_URL || "https://docs.html2.io";
    return [
      {
        source: "/docs/:path*",
        destination: `${docs}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
