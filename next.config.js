/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_GMAPS_KEY: process.env.NEXT_PUBLIC_GMAPS_KEY,
  },
}

module.exports = nextConfig