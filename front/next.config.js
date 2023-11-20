/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return {
            fallback: [{source: '/:path*', destination: '/user/:path*'}]
        }
    },
}

module.exports = nextConfig
