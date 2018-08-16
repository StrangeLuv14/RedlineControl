import osc from 'osc'

const udpPort = new osc.UDPPort({localAddress: '0.0.0.0', localPort: 57121, metadata: true, broadcast: true})

// udpPort.on('bundle', (oscBundle, timeTag, info) => {
//     console.log(`Receive OSC bundle(${timeTag}): ${oscBundle}`);
// })

udpPort.open()

udpPort.on('ready', () => {
    log('OSC port ready')
})

//relay received message back to sendOSC function
udpPort.on('message', function(msg) {
    this.emit('received', msg)
})

const sendOSC = (address, args) => {
    log(`Send OSC message to ${address}`)
    udpPort.send({
        address: address,
        args: args
    }, 'localhost', 7000)

    return new Promise((resolve, reject) => {
        udpPort.once('received', msg => {
            const address = msg.address
            const status = msg.args[0].value
            log(`Receive OSC message from address ${address}: ${status}`)
            resolve(status)
        })
    })
}

export default {sendOSC}
