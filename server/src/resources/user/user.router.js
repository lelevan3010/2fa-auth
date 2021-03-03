import Router from 'express'
import * as UserController from './user.controller'
import { authJWT } from '../../middlewares/authJWT'
import { check } from 'express-validator'
import UserModel from './user.model'

const router = Router()

router.route('/').get(UserController.getAllUsers)
router.route('/login').post(UserController.loginUser)
router.route('/profile').get(authJWT, UserController.getUserProfile)
router.route('/check-auth-status').get(authJWT, UserController.checkAuthStatus)
router.route('/signup').post([
    check('username').not().isEmpty().custom((value, {req})=>{
        return new Promise((resolve,reject)=>{
            UserModel.findOne({username: req.body.username}, (err, user)=>{
                if(err){
                    reject(new Error('Server Error'))
                } 
                if(Boolean(user)){
                    reject(new Error('Username already in use'))
                }
                resolve(true)
            })
        }) 
    }),
    check('email').not().isEmpty().isEmail().custom((value, {req})=>{
        return new Promise((resolve,reject)=>{
            UserModel.findOne({email: req.body.email}, (err, user)=>{
                if(err){
                    reject(new Error('Server Error'))
                } 
                if(Boolean(user)){
                    reject(new Error('Email already in use'))
                }
                resolve(true)
            })
        }) 
    }),
    check('password', 'Password at least 5 characters long').isLength({min: 5})
], UserController.signupUser)

export default router
