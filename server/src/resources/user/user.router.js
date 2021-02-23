import Router from 'express'
import * as UserController from './user.controller'
import { authJWT } from '../../middlewares/authJWT'
import UserModel from './user.model'
import { logginUser } from './user.service'

const router = Router()

router.route('/').get(UserController.getAllUsers)
router.route('/signup').post(UserController.signupUser)
router.route('/login').post(UserController.loginUser)
router.route('/profile').get(authJWT, UserController.getUserProfile)

export default router
