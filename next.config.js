/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Ignorar ESLint durante build (temporário)
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Otimizações de imagem
  images: {
    domains: ['ladrilhart.com', 'www.ladrilhart.com', 'localhost'],
    formats: ['image/webp', 'image/avif'],
  },

  env: {
    SITE_NAME: 'LADRILHART',
    COMPANY_PHONE: '+351 965 414 792',
    COMPANY_EMAIL: 'info@ladrilhart.pt',
  },
}

module.exports = nextConfig
