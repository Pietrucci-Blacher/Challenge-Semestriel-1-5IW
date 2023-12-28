/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "**",
            },
        ],
    },
    i18n,
    async rewrites() {
        return {
            fallback: [{ source: '/:path*', destination: '/user/:path*' }],
        };
    },
};

module.exports = nextConfig;
