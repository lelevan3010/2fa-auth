import bodyParser from 'body-parser'
import cors from 'cors'
require('express-async-errors')

import { app } from './server'
import { connectDb, errorDb } from './services/db'
import userRoute from './resources/user/user.router'
import historyRoute from './resources/history/history.router'

connectDb
  .then(() => console.log('DB Connected'))
  .catch(error => console.log(error))

errorDb.on('error', err => {
  console.log(`DB connection error: ${err.message}`)
})

const port = process.env.PORT || 3000
const server = app.listen(port, () => {
  console.log(`server running on ${port}`)
})

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
app.get('/status', (req, res) => {
  res.send('server online')
})
app.use('/user', userRoute)
app.use('/history', historyRoute)

process.on('unhandledRejection', e => {
  server.close(() => {
    process.exit(1)
  })
})
