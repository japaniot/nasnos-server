const dgram = require('dgram')
const net = require('net')
const config = require('./config')

const wifiSetupServer = dgram.createSocket('udp4')

wifiSetupServer.on('message', (msg, rinfo) => {
  msg = msg.toString()
  if (!msg.startsWith(config.wifiSetup.header)) {
    console.log('Invalid wifiSetup message:', msg)
    return
  }

  require('./wifi-setup')(wifiSetupServer, msg.substr(config.wifiSetup.header.length), rinfo)
})

wifiSetupServer.bind(config.wifiSetup.port)

const controlServer = net.createServer((client) => {
  client.on('data', (data) => {
    console.log(data.toString())
  })
})

controlServer.listen(config.control.port)

console.log(`Server IP address: ${config.networkInterface.address}`)
