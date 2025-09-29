/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    NEXT_PUBLIC_GMAPS_KEY: process.env.NEXT_PUBLIC_GMAPS_KEY,
  },
}

module.exports = nextConfig