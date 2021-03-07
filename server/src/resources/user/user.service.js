import UserModel from './user.model'
import bcrypt from 'bcrypt'
import crypto from 'crypto';
import util from 'util';
import qrcode from 'qrcode';
import base32Encode from 'base32-encode';
import { verifyTOTP } from '../../utils/otp';
import { generateToken } from '../../utils/generateToken'

export const queryUserProfile = async (req, res, next) => {
  await UserModel.findOne(req._id).exec((err, user) => {
    if (err) {
      return next(err)
    } else {
      if (user === null) {
        let err = new Error('Unauthorized!!!')
        err.status = 400
        return next(err)
      } else {
        return res
          .status(200)
          .json({ username: user.username, email: user.email })
      }
    }
  })
}

export const createNewUser = async (email, username, password) => {
  try {
    let newUser = { email, username, password }
    const user = await UserModel.create(newUser)
    return user
  } catch (error) {
    return error
  }
}

export const logginUser = async (logUsername, logPassword, callback) => {
  await UserModel.findOne({ username: logUsername }).exec((err, user) => {
    if (err || !user) {
      return callback(err)
    }
    bcrypt.compare(logPassword, user.password, (err, result) => {
      if (result === true) {
        return callback(null, user)
      } else {
        return callback()
      }
    })
  })
}

export const queryAllUsers = async () => {
  try {
    const allUSer = await UserModel.find()
    return allUSer
  } catch (error) {
    return error
  }
}

export const queryAuthStatus = async (req, res, next) => {
  try {
    const userId = req.body._id;
    let user = await UserModel.findOne({_id: userId})
    
    res.status(200).json({ Auth: { loggedIn: true, mfaEnabled: user.mfaEnabled } })
  } catch (error) {
    return error
  }
}

export const queryMfaStatus = async (req, res, next) => {
  try {
    

    res.status(200)
    // .json({ Auth: { mfaEnabled: user.mfaEnabled } })
  } catch (error) {
    return error
  }
}


export const getMfaQrCode = async (req, res, next) => {
  try {
    // const userId = req.params._id;
    const userId = req.query._id;
    let user = await UserModel.findOne({_id: userId})

    // return res.status(200).json(user)
    // For security, we no longer show the QR code after is verified
    if (user.mfaEnabled) return res.status(404).json({error: "MFA already enabled!"});

    if (!user.mfaSecret) {
      // generate unique secret for user
      // this secret will be used to check the verification code sent by user
      const buffer = await util.promisify(crypto.randomBytes)(14);
      user.mfaSecret = base32Encode(buffer, 'RFC4648', { padding: false });

      await UserModel.updateOne({_id: userId}, {mfaSecret: user.mfaSecret})
    }

    const issuer = 'MfaDemo';
    const algorithm = 'SHA1';
    const digits = '6';
    const period = '30';
    const otpType = 'totp';
    const configUri = `otpauth://${otpType}/${issuer}:${user.username}?algorithm=${algorithm}&digits=${digits}&period=${period}&issuer=${issuer}&secret=${user.mfaSecret}`;

    res.setHeader('Content-Type', 'image/png');

    qrcode.toFileStream(res, configUri);
  } catch (error) {
    res.status(400).json({error: error})
  }
  
}

export const verifyOtpPin = async (req, res, next) => {
  try {
    try {
      const userId = req.body._id;
      let user = await UserModel.findOne({_id: userId})
  
      if (verifyTOTP(req.body.code, user.mfaSecret)) {
        user.mfaEnabled = true;
        await UserModel.updateOne({_id: userId}, {mfaEnabled: user.mfaEnabled})
  
        const payload = {
          user: {
            _id: user._id,
          },
        }
  
        generateToken(payload, 3600, res)
      }
    } catch (error) {
      res.status(400).json({error: "Error with PIN code: " + error});
    }
  } catch (error) {
    return error
  }
}
