const million = require('million/compiler');
/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
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

const millionConfig = {
    auto: true, // if you're using RSC: auto: { rsc: true },
};

module.exports = million.next(nextConfig, millionConfig);
