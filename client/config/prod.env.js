

'use strict'
const os = require('os');

module.exports = {
  NODE_ENV: '"production"',
  HOST: `'${os.networkInterfaces().en0[1].address}'`
}
