/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  api: {
    bodyParser: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sm.ign.com',
        port: '',
        pathname: '/t/ign_pl/**',
      },
    ],

    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}

module.exports = nextConfig
