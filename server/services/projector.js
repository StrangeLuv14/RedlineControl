import config from '../config/projector'
import PJLink from 'pjlink'

//Promisfy
PJLink.prototype.on = function() {
    return new Promise((resolve, reject) => {
        this.powerOn((err) => {
            if (err) {
                reject()
            }
            resolve()
        })
    })
}

PJLink.prototype.off = function() {
    return new Promise((resolve, reject) => {
        this.powerOff((err) => {
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
    const powerOnList = projectors.map(projector => projector.on)
    return Promise.all(powerOnList)
}

const powerOff = () => {
    const powerOffList = projectors.map(projector => projector.off)
    return Promise.all(powerOffList)
}

// const powerOn = function(done) {
//     projectors.forEach(projector => projector.powerOn((err) => {
//         if (err) {
//             return done(err);
//         }
//     }));
//     return done(undefined, "Projectors are on");
// }
//
// const powerOff = function(done) {
//     projectors.forEach(projector => projector.powerOff((err) => {
//         if (err) {
//             return done(err);
//         }
//
//     }));
//     return done(undefined, "Projectors are off");
// }

module.exports = {
    powerOn,
    powerOff
}
