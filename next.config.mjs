/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Statik çıktı almak için şart
  images: {
    unoptimized: true, // GitHub Pages görsel optimizasyonunu desteklemediği için şart
  },
};

module.exports = nextConfig;
