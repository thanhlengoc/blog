const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000 // Port để chạy app Nextjs, cũng là server nodejs
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()


app.prepare().then(() => {
    const server = express()

    server.get('/admin', (req, res) => {
        return app.render(req, res, '/admin', req.query)
    })

    // server.get('/admin/login', (req, res) => {
    //     return app.render(req, res, '/admin/login', req.query)
    // })
    //
    // server.get('/admin/register', (req, res) => {
    //     return app.render(req, res, '/admin/register', req.query)
    // })

    server.get('/posts/:slug', (req, res) => {
        return app.render(req, res, '/posts', {slug: req.params.slug})
    })

    server.get('/admin/editor/:slug', (req, res) => {
        return app.render(req, res, '/admin/editor', {slug: req.params.slug})
    })

    server.all('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(port, err => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})