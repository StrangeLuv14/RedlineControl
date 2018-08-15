import mongoose from 'mongoose'
const Schema = mongoose.Schema

const albumSchema = new Schema({
    album_id: Number,
    // sort_num: Number,
    chinese_name: String,
    english_name: String,
    description: String,
    big_image_url: String,
    small_image_url: String,
    stories: [
        {
            type: Schema.Types.ObjectId,
            ref: 'story'
        }
    ]
})

albumSchema.statics.findByAlbumId = function(albumId) {
    return this.findOne({album_id: albumId})
}

const Album = mongoose.model('album', albumSchema)

export default Album
