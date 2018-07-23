const net = require('net')

const addrs = ['10.1.1.20', '10.1.1.21']
let clients = []
let results = []

const commands = {
    on: [
        0x48,
        0x07,
        0x01,
        0x03,
        0xE8,
        0x01,
        0xFF
    ],
    off: [
        0x48,
        0x07,
        0x02,
        0x03,
        0xE8,
        0x02,
        0xFF
    ],
    status: [
        0x48,
        0x07,
        0x04,
        0x00,
        0x00,
        0x00,
        0xFF
    ],
    config: [
        0x48,
        0x07,
        0x05,
        0x00,
        0x00,
        0x01,
        0xFF
    ]
}

const hexToString = (hexArr, delim) => {
    let strArr = []
    hexArr.forEach((hex) => {
        const str = Number('0x' + hex)
        strArr.push(str)
    })
    return strArr.join(delim)
}

const hexToNum = (hexArr) => {
    let num = 0
    hexArr.forEach((hex) => {
        num = Number('0x' + hex) + num * Math.pow(2, 8)
    })
    return num
}

const getStatus = (conn, res) => {
    const pattern = new RegExp('[A-Za-z0-9]{2}', 'g')
    result = res.match(pattern)
    let operation
    let status
    if (result[0] === '48' && result[1] === '07') {
        if (result[2] === '01') {
            operation = 'Power on'
            if (result[5] == '21') {
                status = 'Succeed'
            } else if (result[5] === '11') {
                status = 'Failed'
            } else {
                return
            }
        } else if (result[2] === '02') {
            operation = 'Power off'
            if (result[5] === '22') {
                status = 'Succeed'
            } else if (result[5] === '12') {
                status = 'Failed'
            } else {
                return
            }
        } else if (result[2] === '03') {
            operation = 'Reset'
            if (result[5] == '24') {
                status = 'Succeed'
            } else if (result[5] === '13') {
                status = 'Failed'
            } else {
                return
            }
        } else if (result[2] === '04') {
            operation = 'Status'
            if (result[5] == '00') {
                status = 'Off'
            } else if (result[5] === '01') {
                status = 'On'
            } else {
                return
            }
        }
    } else if (result[0] === '55' && result[1] === 'aa') {
        operation = 'Config'
        const gateway = hexToString(result.slice(2, 6), '.')
        const mask = hexToString(result.slice(6, 10), '.')
        const localIP = hexToString(result.slice(10, 14), '.')
        const localPort = hexToNum(result.slice(14, 16))
        const targetIP = hexToString(result.slice(16, 20), '.')
        const targetPort = hexToNum(result.slice(20, 22))
        const macAddr = result.slice(22, 28).join(':')
        const mode = result[28] === '01'
            ? 'TCP Client'
            : 'TCP Server'
        status = {
            gateway,
            mask,
            localIP,
            localPort,
            targetIP,
            targetPort,
            macAddr,
            mode
        }
        console.log(`
            Mode: ${mode}
                Gateway: ${gateway}
                Mask: ${mask}
                LocalIP: ${localIP}
                LocalPort: ${localPort}
                MAC Addr: ${macAddr}`);
    }

    return {operation, status}
}

const writeToServer = (command, done) => {
    addrs.forEach((addr) => {
        console.log(`Connect to ${addr}`);
        const client = net.createConnection(1500, addr, () => {
            console.log(`Connected to ${addr}:1500`);
            client.setEncoding('hex')

            // write request
            client.write(Buffer.from(command), () => {
                // console.log('Write data to server');
            })

            // handle response data
            client.on('data', function(data) {
                console.log(`Received data: ${data}`);
                result = getStatus(this, data)
                // client.end()

                // Push result into results array
                if (result) {
                    console.log(`Operation on ${this.remoteAddress}: ${result.operation}: ${result.status}`);
                    results.push(result)
                }

                // return all results
                if (results.length === addrs.length) {
                    done(results)
                    results = []
                }

                this.end()
            })

        })

        client.on('error', function(err) {
            console.log(`Connection on ${this.remoteAddress} error: ${err.code}`);
        })

        client.on('end', () => {
            console.log('Disconnect from server');
        })
    })
}

const powerOn = (done) => {
    console.log('Power On');
    writeToServer(commands.on, (result) => {
        done(result)
    })
}

const powerOff = (done) => {
    console.log('Power Off');
    console.log(`Shut down ${clients.length} Clients`)
    writeToServer(commands.off, (result) => {
        done(result)
    })
}

const getPowerStatus = (done) => {
    console.log('Get Media Server Power Status');
    writeToServer(commands.status, (result) => {
        done(result)
    })
}

const getConfig = (done) => {
    console.log('Get Ethernet Power Control Configure');
    writeToServer(commands.config, (result) => {
        done(result)
    })
}

module.exports = {
    powerOn,
    powerOff,
    getPowerStatus,
    getConfig
}
