const webSocketServer = require('./webSocketServer');
const ethernetPowerControl = require('./ethernetPowerControl')

module.exports.wakeUp = function(done) {
    ethernetPowerControl.powerOn((result) => {
        done(result)
    })
}

module.exports.shutDown = function(done) {
    ethernetPowerControl.powerOff((result) => {
        done(result)
    })
}

module.exports.getStatus = function(done) {
    ethernetPowerControl.getPowerStatus((result) => {
        done(result)
    })
}

module.exports.getConfig = function(done) {
    ethernetPowerControl.getConfig((result) => {
        done(result)
    })
}

module.exports.play = function(control, done) {
    const clients = webSocketServer.clients
    if (clients.lengths > 0) {
        webSocketServer.clients.forEach(function each(client) {
            client.send(control);
        });
    }
    done(undefined, 'Finish play movie')
}

module.exports.pause = function(control, done) {
    const clients = webSocketServer.clients
    if (clients.lengths > 0) {
        webSocketServer.clients.forEach(function each(client) {
            client.send(control);
        });
    }
    done(undefined, 'Finish pause movie')
}

module.exports.stop = function(control, done) {
    webSocketServer.clients.forEach(function each(client) {
        client.send(control);
    });
    done(undefined, 'Finish stop movie')
}

module.exports.select = function(id, done) {
    const control = 'video ' + id
    webSocketServer.clients.forEach(function each(client) {
        client.send(control);
    });
    done(undefined, 'Finish select movie')
}
