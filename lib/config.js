const os = require('os')

module.exports = {
  networkInterface: getNetworkInterface(),
  wifiSetup: {
    port: 988,
    header: '123456AT+',
    end: '\r',
    ok: '+OK'
  }
}

function getNetworkInterface() {
  const interfaces = os.networkInterfaces()
  for (const name in interfaces) {
    for (obj of interfaces[name]) {
      if (obj.family === 'IPv4' && !obj.internal)
        return obj
    }
  }
}
