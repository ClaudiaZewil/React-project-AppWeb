const {createProxyMiddleware} = require("http-proxy-middleware");
module.exports = app => {
    app.use(
        createProxyMiddleware('/search',
            {
                target: 'https://api.deezer.com',
                changeOrigin: true
            })
    )
}