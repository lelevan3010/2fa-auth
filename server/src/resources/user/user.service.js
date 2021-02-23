import UserModel from './user.model'
import bcrypt from 'bcrypt'

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
        return res.send(
          '<h1>Name: </h1>' +
            user.username +
            '<h2>Mail: </h2>' +
            user.email +
            '<br><a type="button" href="/logout">Logout</a>',
        )
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
