import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const historySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  date: { type: Date, default: Date.now },
})

const HistoryModel = mongoose.model('History', historySchema)

export default HistoryModel
