import projector from '../services/projector'
import ethernetPowerControl from '../services/ethernetPowerControl'

const mediaServerControl = (req, res) => {
    res.json({server: 'on'})
}

const projectorControl = (req, res) => {
    res.json({projector: 'on'})
}

export default {mediaServerControl, projectorControl}
