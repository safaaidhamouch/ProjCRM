/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Ajout de la configuration pour le dossier src
  experimental: {
    // Cette option n'est plus nécessaire dans les versions récentes de Next.js
    // car le dossier src est automatiquement supporté
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
