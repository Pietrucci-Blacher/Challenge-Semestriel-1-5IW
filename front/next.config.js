/** @type {import('next').NextConfig} */

const nextConfig = {
    async rewrites() {
        return {
            fallback: [{source: '/:path*', destination: '/user/:path*'}]
        }
    },
    output: 'export',
    trailingSlash: true,
}

module.exports = nextConfig
