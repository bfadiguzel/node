const http = require('http')
const routes = require('./routes')

const server = http.createServer(routes.handler) //a server has been created

server.listen(3000) // it creats a server = /localhost:3000



