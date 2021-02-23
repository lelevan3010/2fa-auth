import mongoose from 'mongoose'

//db connection
export const connectDb = mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

export const errorDb = mongoose.connection
