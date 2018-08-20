import mongoose from 'mongoose'
import mongodb from 'mongodb'
import Album from '../models/album'
import Story from '../models/story'

const ObjectId = mongoose.Types.ObjectId

import fs from 'fs'
import path from 'path'

const saveData = (JSONFile) => {
    const dataObj = JSON.parse(JSONFile)
    let albums = []
    let stories = []

    dataObj.forEach(album => {
        const _id = new ObjectId()
        const album_id = album.album_id
        const chinese_name = album.chinese_name
        const english_name = album.english_name
        const big_image_url = album.big_image_url
        const small_image_url = album.small_image_url
        const description = album.description

        // Create new album
        const newAlbum = new Album({
            _id,
            album_id,
            chinese_name,
            english_name,
            big_image_url,
            small_image_url,
            description,
            stories: []
        })

        // Create new stories
        album.stories.forEach(story => {
            const _id = new ObjectId()
            const story_id = story.story_id
            const album = _id
            const sort_num = story.sort_num
            const chinese_title = story.chinese_title
            const english_title = story.english_title
            const big_image_url = story.big_image_url
            const small_image_url = story.small_image_url
            const description = story.description
            const duration = story.duration

            newAlbum.stories.push(_id)

            const newStory = new Story({
                _id,
                story_id,
                album,
                sort_num,
                chinese_title,
                english_title,
                big_image_url,
                small_image_url,
                description,
                duration
            })
            stories.push(newStory)
        })

        // save new album
        albums.push(newAlbum)
    })

    return {albums, stories}
}

const buildFromFile = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./data.json', (err, data) => {
            const {albums, stories} = saveData(data)
            Promise.all([Album.create(albums), Story.create(stories)]).then(results => resolve()).catch(err => reject())
        })
    })
}

const loadDatabase = (db) => {
    fs.readdir('./public/media', (err, files) => {
        if (err) {
            console.log(`Read media folder failed: ${err.message}`)
            console.log('Create media folder')
            fs.mkdir('./public/media', (err) => {
                if (err) {
                    console.log(`Create media folder failed: ${err.message}`);
                }
            })
        }
        if (!files || files.length === 0) {
            console.log('Media folder is empty, download files');
            const bucket = new mongodb.GridFSBucket(db)

            // get gridFS file collections
            const File = db.collection('fs.files')
            File.find({}).toArray().then(files => {
                files.forEach(file => {
                    try {
                        fs.mkdirSync('./public/media/' + file.filename.split('/')[0])
                    } catch (e) {}
                    const filepath = path.join(__dirname, '../../public/media/', file.filename)
                    bucket.openDownloadStream(file._id).pipe(fs.createWriteStream(filepath)).on('error', (err) => {
                        log(`Error download: ${err.message}`)
                    }).on('end', () => {
                        console.log(`${filepath}`);
                    })
                })
            }).catch(err => {
                console.log(err);
            })
        }
    })
}

export default {loadDatabase}
