const defaultGateway = require('default-gateway')
const config = require('./config')

module.exports = async (server, msg, rinfo) => {
  if (msg.startsWith('NIP=?')) {
    const {address, netmask} = config.networkInterface
    const {gateway} = await defaultGateway.v4()
    server.send(`${config.wifiSetup.ok}=0,"${address}","${netmask}","${gateway}","${gateway}"`, rinfo.port, rinfo.address)
  } else if (msg.startsWith('SSID=?')) {
    server.send(`${config.wifiSetup.ok},"WIFI SSID"`, rinfo.port, rinfo.address)
  } else if (msg.startsWith('ENCRY=?')) {
    server.send(`${config.wifiSetup.ok}=0`, rinfo.port, rinfo.address)
  } else if (msg.startsWith('KEY=?')) {
    server.send(`${config.wifiSetup.ok}=0,"WIFI Password"`, rinfo.port, rinfo.address)
  } else {
    server.send(config.wifiSetup.ok, rinfo.port, rinfo.address)
  }
}
