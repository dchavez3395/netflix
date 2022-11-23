/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['image.tmdb.org', 'rb.gy', 'freepnglogos.com']
  }
}

module.exports = nextConfig
