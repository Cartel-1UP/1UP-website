/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // runtime: 'experimental-edge',
    appDir: true,
  },
  api: {
    bodyParser: true
  }
}

module.exports = nextConfig
