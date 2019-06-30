const dgram = require('dgram')
const server = dgram.createSocket('udp4')

const config = require('./config')

server.on('message', (msg, rinfo) => {
  msg = msg.toString()

  if (msg.startsWith(config.wifiSetup.header)) {
    msg = msg.substr(config.wifiSetup.header.length)
    require('./wifi-setup')(server, msg, rinfo)
  } else {
    console.log(msg)
  }
})

server.on('listening', () => {
  const address = server.address()
  console.log(`server listening ${config.networkInterface.address}:${address.port}`)
})

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`)
  server.close()
})

server.bind(config.wifiSetup.port)
