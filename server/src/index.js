import bodyParser from 'body-parser'
import session from 'express-session'
import { app } from './server'
import { connectDb, errorDb } from './services/db'
import userRoute from './resources/user/user.router'

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
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  session({
    //use sessions for tracking logins
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
  }),
)

// Routes
app.get('/status', (req, res) => {
  res.send('server online')
})
app.use('/user', userRoute)

process.on('unhandledRejection', e => {
  server.close(() => {
    process.exit(1)
  })
})
