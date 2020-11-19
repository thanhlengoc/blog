const express = require('express') // Sử dụng framework express
const next = require('next') // Include module next
// const cacheableResponse = require('cacheable-response')

const port = parseInt(process.env.PORT, 10) || 3000 // Port để chạy app Nextjs, cũng là server nodejs
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// const ssrCache = cacheableResponse({
//     ttl: 1000 * 60 * 60, // 1hour
//     get: async ({ req, res, pagePath, queryParams }) => ({
//         data: await app.renderToHTML(req, res, pagePath, queryParams)
//     }),
//     send: ({ data, res }) => res.send(data)
// })

app.prepare().then(() => {
    const server = express()

    server.all('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(port, err => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})