'use strict'

require('dotenv').config()

module.exports = (app, httpPort) => {
  app.enable('trust proxy')

  app.use((req, res, next) => {
    if (req.secure) {
      next()
    } else {
      const proxypath = process.env.PROXY_PASS || ''
      res.redirect(301, `https://${req.headers.host}${proxypath}${req.url}`)
    }
  })

  app.listen(httpPort)
}
