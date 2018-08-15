import Album from '../models/album'

const getAlbums = (req, res) => {
    // exclude _id and __v fields
    return Album.find({}).select('-_id -__v').populate('stories', '-_id -__v').then(albums => {
        res.json(albums)
    }).catch(err => res.status(400).json(err))
}

const getAlbumById = (req, res) => {
    const id = req.params.id
    return Album.findById(id).select('-_id -__v').populate('stories', '-_id -__v').then(album => album).catch(err => err)
}

const getAlbumByAlbumId = (req, res) => {
    const albumId = req.params.album_id
    return Album.findByAlbumId(album_id).select('-_id -__v').populate('stories', '-_id -__v').then(album => album).catch(err => err)
}

export default {getAlbums, getAlbumById, getAlbumByAlbumId}
