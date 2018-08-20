import projector from '../services/projector'
import ethernetPowerControl from '../services/ethernetPowerControl'

const mediaServerControl = (req, res) => {
    res.json({server: 'on'})
}

const projectorControl = (req, res) => {
    const command = req.body.control

    if (command === 'on') {
        projector.powerOn().then(() => {
            res.json({projector: 'on'})
        }).catch(err => {
            res.json({error: err})
        })
    } else if (command === 'off') {
        projector.powerOff().then(() => {
            res.json({projector: 'off'})
        }).catch(err => {
            res.json({error: err})
        })
    }

    // res.json({projector: 'on'})
}

export default {mediaServerControl, projectorControl}
