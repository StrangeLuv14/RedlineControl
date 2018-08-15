import webSocketServer from './webSocketServer'

// Methods for Media Server Playback Control
const sendCommand = (command) => {
    const clients = webSocketServer.clients
    return new Promise((resolve, reject) => {
        if (clients.size === 0) {
            reject('No available clients')
        }
        webSocketServer.clients.forEach(client => client.send(command))
        if (command === 'play') {
            resolve({playback: 'playing'})
        } else if (command === 'pause') {
            resolve({playback: 'pause'})
        } else if (command === 'stop') {
            resolve({playback: 'stop'})
        } else if (command.split(' ')[0] === 'video') {
            resolve({select: 'OK'})
        } else {
            reject('invalid command')
        }
    })
}

export default {sendCommand}
