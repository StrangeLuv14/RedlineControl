import Story from '../models/story'

const getStories = (req, res) => {
    // exclude _id and __v and album fields
    return Story.find({}).select('-_id -__v -album').then(stories => stories).catch(err => err)
}

const getStoryById = (req, res) => {
    const id = req.params.id
    return Story.findById(id).select('-_id -__v -album').then(story => story).catch(err => err)
}

const getStoryByStoryId = (req, res) => {
    const storyId = req.params.story_id
    return Story.findByStoryId(storyId).select('-_id -__v -album').then(story => story).catch(err => err)
}

export default {getStories, getStoryById, getStoryByStoryId}
