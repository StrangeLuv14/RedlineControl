import fs from 'fs'
import {exec} from 'child_process'
import utils from '../models/utils'
import mongoose from 'mongoose'
import mediaServer from '../services/mediaServer'

const reset = (req, res) => {
    //delete media folder
    exec('rm -rf ./public/media', (err, stdout, stderr) => {})
    mediaServer.sendOSC('/reset', [
        {
            type: 'i',
            value: 1
        }
    ]).then(result => {
        utils.loadDatabase(mongoose.connection.db)
        res.json({reset: true})
    }).catch(err => {
        res.json({error: err})
    });

}

export default {reset}
