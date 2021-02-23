import {
    queryAllUsers,
    createNewUser,
    logginUser,
    queryUserProfile,
  } from './user.service'
  import { generateToken } from '../../utils/generateToken'
  import UserModel from './user.model'
  
  export const getAllUsers = async (req, res) => {
    try {
      const allUser = await queryAllUsers()
      res.status(200).json(allUser)
    } catch (error) {
      res.status(400).json({ error: 'error getAllUser' + error })
    }
  }
  
  export const getUserProfile = async (req, res, next) => {
    try {
      const userProfile = await queryUserProfile(req, res, next)
    } catch (error) {
      res.status(400).json({ error: 'error get user profile' + error })
    }
  }
  
  export const signupUser = async (req, res) => {
    try {
      const { email, username, password } = req.body
      const user = await createNewUser(email, username, password)
      const payload = {
        user: {
          _id: user._id,
        },
      }
      generateToken(payload, 3600, res)
    } catch (error) {
      res.status(400).json({ error: 'cannot create user' })
    }
  }
  
  export const loginUser = async (req, res, next) => {
    try {
      const { logUsername, logPassword } = req.body
      const user = await logginUser(logUsername, logPassword, (error, user) => {
        if (error || !user) {
          let err = new Error('Wrong email or password.')
          err.status = 401
          return next(err)
        } else {
          req.session.userId = user._id
          const payload = {
            user: {
              _id: user._id,
            },
          }
  
          generateToken(payload, 3600, res)
        }
      })
    } catch (error) {
      res.status(400).json({ error: 'cannot login user' })
    }
  }
