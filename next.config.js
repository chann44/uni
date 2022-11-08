/** @type {import('next').NextConfig} */
nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
}


const withTM = require('next-transpile-modules')(['lightweight-charts', 'fancy-canvas']);

module.exports = withTM(nextConfig);
