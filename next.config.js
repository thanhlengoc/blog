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
        exportPathMap: function () {
            return {
                '/': { page: '/' }
            }
        }
    },
    {
        webpack: (config, { isServer }) => {
            // Fixes npm packages that depend on `fs` module
            if (!isServer) {
                config.node = {
                    fs: 'empty'
                }
            }

            return config
        }
    }
]);
