const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");

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
    {
        exportPathMap: async function (
            defaultPathMap,
            { dev, dir, outDir, distDir, buildId }
        ) {
            return {
                '/': { page: '/' },
                '/get-started': { page: '/get-started' },
                '/web-dev': { page: '/web-dev'},
                '/dev-ops': { page: '/dev-ops'},
            }
        },
    }
]);
