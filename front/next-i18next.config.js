/** @type {import('next-i18next').UserConfig} */
module.exports = {
    i18n: {
        defaultLocale: 'fr',
        locales: ['fr', 'en'],
    },
    reloadOnPrerender: process.env.NODE_ENV === 'development',
}
