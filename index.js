var path = require('path')
var Server = require('http').Server
var Express = require('express')

const app = new Express()
const server = new Server(app)

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'dist')))

// universal routing and rendering
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

// start the server
var port = process.env.PORT || 8000
var env = process.env.NODE_ENV || 'production'
server.listen(port, function (err) {
  if (err)  return console.error(err)
  console.info(`Server running on http://localhost:${port} [${env}]`)
})
