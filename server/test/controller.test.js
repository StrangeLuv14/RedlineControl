import mongoose from 'mongoose'
import expect from 'expect'
import Album from '../models/album'
import Story from '../models/story'
import albumController from '../controllers/albumController'
import storyController from '../controllers/storyController'

describe('album controller test', () => {

    it('should get all albums', done => {
        albumController.getAlbums().then(albums => {
            expect(albums.length).toBe(5)
            done()
        })
    })

    it('should get a album by _id', done => {
        Album.create({
            album_id: 100,
            chinese_name: '罗宾汉',
            english_name: 'Robin Hood',
            big_image_url: '/test/test1',
            small_image_url: '/test/test2',
            description: 'Good Album',
            stories: []
        }).then(album => album._id).then(id => {
            albumController.getAlbumById(id).then(album => {
                expect(album.english_name).toBe('Robin Hood')
                done()
            })
        })
    })

    it('should get a album by albumId', done => {
        albumController.getAlbumByAlbumId(1).then(album => {
            expect(album.english_name).toBe('Fairy tale Theme party')
            done()
        })
    })
})

describe('story controller test', () => {
    it('should get all stories', done => {
        storyController.getStories().then(stories => {
            expect(stories.length).toBe(42)
            done()
        })
    })

    it('should get a story by _id', done => {
        Story.create({
            story_id: 100,
            chinese_title: '美女与野兽',
            english_title: 'Beauty and Beast',
            big_image_url: '/test/test1',
            small_image_url: '/test/test2',
            description: 'Bad Story'
        }).then(story => story._id).then(id => {
            storyController.getStoryById(id).then(story => {
                expect(story.english_title).toBe('Beauty and Beast')
                done()
            })
        })
    })

    it('should get a story by storyId', done => {
        storyController.getStoryByStoryId(9).then(story => {
            expect(story.english_title).toBe('Princess Diary')
            done()
        })
    })
})
