/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  env: {
    API_HOST: process.env["API_HOST"],
    API_PORT: process.env["API_PORT"],
  },
  images: {
    domains: [process.env["API_HOST"]],
  },
  async rewrites() {
    return [
      {
        source: "/commentApi/:path*",
        destination: `http://${process.env["API_PORT"]}:${process.env["API_PORT"]}/api/:path*`,
      },
      {
        source: "/uploads/:path*",
        destination: `http://localhost:3001/uploads/:path*`,
      },
    ];
  },
};
