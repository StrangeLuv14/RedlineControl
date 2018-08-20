import config from '../config/projector'
import PJLink from 'pjlink'

//Promisfy
const on = (projector) => {
    return new Promise((resolve, reject) => {
        projector.powerOn((err) => {
            if (err) {
                reject()
            }
            resolve()
        })
    })
}

const off = (projector) => {
    return new Promise((resolve, reject) => {
        projector.powerOff((err) => {
            if (err) {
                reject()
            }
            resolve()
        })
    })
}

const projectors = []

config.hosts.forEach((host) => {
    projectors.push(new PJLink(host, config.port, config.password));
});

const powerOn = () => {
    const powerOnList = projectors.map(projector => on(projector))
    return Promise.all(powerOnList)
}

const powerOff = () => {
    const powerOffList = projectors.map(projector => off(projector))
    return Promise.all(powerOffList)
}

module.exports = {
    powerOn,
    powerOff
}
