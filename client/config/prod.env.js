
'use strict'
const os = require('os');

module.exports = {
  NODE_ENV: '"production"',
  HOST: `'${os.networkInterfaces().wlan0[0].address}'`
}
