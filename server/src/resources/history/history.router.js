import Router from 'express'
import * as HistoryController from './history.controller'
import { authJWT } from '../../middlewares/authJWT'

const router = Router()

router.route('/post-history').post(authJWT, HistoryController.postUserHistory)
router.route('/get-history/:_id').get(authJWT, HistoryController.getUserHistory)

export default router
