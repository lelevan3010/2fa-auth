import {
  queryAllUsers,
  createNewUser,
  logginUser,
  queryUserProfile,
  queryAuthStatus,
  queryMfaStatus,
  getMfaQrCode,
  verifyOtpPin
} from './user.service'
import { validationResult } from 'express-validator'

export const getAllUsers = async (req, res) => {
  const allUser = await queryAllUsers()
  res.status(200).json(allUser)
}

export const getUserProfile = async (req, res, next) => {
  const userProfile = await queryUserProfile(req, res, next)
}

export const signupUser = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  const { email, username, password } = req.body
  const user = await createNewUser(email, username, password)
  const payload = {
    user: {
      _id: user._id,
    },
  }
  
  res.status(200).json(payload)
}

export const loginUser = async (req, res, next) => {
  
  const { logUsername, logPassword } = req.body
  const user = await logginUser(logUsername, logPassword, 
    (error, user) => {
      if (error || !user) {
        let err = new Error('Wrong email or password.')
        err.status = 401
        return res.status(401).json({ message: 'Wrong email or password.' })
      } else {
        console.log(req.session)
        req.session.userId = user._id
        const payload = {
          user: {
            _id: user._id,
          },
        }
        
        res.status(200).json(payload)
        // generateToken(payload, 3600, res)
      }
    }
  )
}

export const checkAuthStatus = async (req, res, next) => {
  await queryAuthStatus(req, res, next)
}

export const checkMfaStatus = async (req, res, next) => {
  await queryMfaStatus(req, res, next)
}

export const generateMfaQrCode = async (req, res, next) => {
  await getMfaQrCode(req, res, next)
}

export const verifyOtp = async (req, res, next) => {
  await verifyOtpPin(req, res, next)
}
