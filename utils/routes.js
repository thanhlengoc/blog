const routes = require('next-routes')

module.exports = routes()
    .add({ name: "index", pattern: "/", page: "index" })
    .add("posts", "/posts/:slug")
    .add({ name: "gettingStarted", pattern: "/", page: "getting-started" })
    .add({ name: "admin", pattern: "/admin", page: "admin/index" })
    .add({ name: "adminNewPost", pattern: "/admin/new-post", page: "admin/new-post" })
    .add({ name: "adminLogin", pattern: "/admin/login", page: "admin/login" })
    .add({ name: "adminRegister", pattern: "/admin/register", page: "admin/register" })
    .add({ name: "adminEditor", pattern: "/admin/editor/:slug", page: "admin/editor/:slug" });