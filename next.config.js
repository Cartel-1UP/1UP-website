/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains:["http://www.w3.org/2000/svg"]
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
