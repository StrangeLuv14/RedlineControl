import express from 'express'
const router = express.Router()

import indexController from '../controllers/indexController'

// Router for /albums

router.post('/reset', indexController.reset)

export default router
