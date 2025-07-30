/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // Deshabilita la optimización de imágenes de Next.js para usar imágenes directamente
  },
}

export default nextConfig
