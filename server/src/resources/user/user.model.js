import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  mfaEnabled: {
    type: Boolean,
    required: false
  },
  mfaSecret: {
    type: String,
    required: false
  }
})

//hashing a password before saving it to the database
userSchema.pre('save', function (next) {
  var user = this
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err)
    }
    user.password = hash
    next()
  })
})

const UserModel = mongoose.model('User', userSchema)

export default UserModel
