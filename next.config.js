const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
})

module.exports = withPlugins([
    [optimizedImages, {
        mozjpeg: {
            quality: 80,
        },
        pngquant: {
            speed: 3,
            strip: true,
            verbose: true,
        },
        imagesPublicPath: '/_next/static/images/',
    }],
    {
        assetPrefix: '.'
    },
    withBundleAnalyzer
]);
