import express from 'express'
const router = express.Router()

import albumController from '../controllers/albumController'

// Router for /albums

router.get('/', albumController.getAlbums)

router.get('/:id', albumController.getAlbumById)

router.get('/:album_id', albumController.getAlbumByAlbumId)

export default router
