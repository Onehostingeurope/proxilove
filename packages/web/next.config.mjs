/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: '.',
  },
  async rewrites() {
    return [
      {
        source: '/admin',
        destination: 'https://admin-kappa-virid-52.vercel.app/',
      },
      {
        source: '/admin/:path*',
        destination: 'https://admin-kappa-virid-52.vercel.app/:path*',
      },
      {
        source: '/assets/:path*',
        destination: 'https://admin-kappa-virid-52.vercel.app/assets/:path*',
      },
    ]
  },
}
export default nextConfig
