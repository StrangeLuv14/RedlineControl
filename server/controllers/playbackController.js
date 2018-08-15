import mediaServer from '../services/mediaServer'
import Story from '../models/story'

// State management
let currentStoryId = 0
let playbackStatus = 'waiting'

const control = (req, res) => {
    const command = req.body.playback

    // set playback status
    if (command === 'play') {
        playbackStatus = 'playing'
    } else {
        playbackStatus = command
    }

    mediaServer.sendOSC('/playback', [
        {
            type: 's',
            value: command
        }
    ]).then(result => {
        log(result)
        res.json({playback: result})
    }).catch(err => {
        res.json({error: err})
    })
}

const getPlaybackStatus = (req, res) => {
    if (currentStoryId === 0) {
        // set playback status
        playbackStatus = 'waiting'

        res.json({"playback_status": playbackStatus})
    } else {
        Story.findByStoryId(current_story_id).then(story => {
            res.json({playback_status: playbackStatus, current_story: story})
        }).catch(err => {
            error : err
        })
    }
}

const select = (req, res) => {
    const command = req.body.story_id

    mediaServer.sendOSC('/select', [
        {
            type: 'i',
            value: command
        }
    ]).then(result => {
        res.json({select: 'OK'})
    }).catch(err => {
        res.json({error: err})
    })
}

const getStoryInfo = (req, res) => {
    const storyId = req.body.story_id
    Story.findByStoryId(storyId).then((story) => {
        current_story_id = story.story_id
        res.json(story)
    }).catch(err => {
        res.json({error: err})
    })
}

export default {control, getPlaybackStatus, select, getStoryInfo}
