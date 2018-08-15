import mongoose from 'mongoose'
const Schema = mongoose.Schema

const storySchema = new Schema({
    story_id: Number,
    album: {
        type: Schema.Types.ObjectId,
        ref: 'album'
    },
    // sort_num: Number,
    chinese_title: String,
    english_title: String,
    description: String,
    big_image_url: String,
    small_image_url: String,
    duration: Number
})

storySchema.statics.findByStoryId = function(storyId) {
    return this.findOne({story_id: storyId})
}

const Story = mongoose.model('story', storySchema)

export default Story
