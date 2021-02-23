import jwt from 'jsonwebtoken'

export const generateToken = (payload, expTime, res) => {
  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    {
      expiresIn: expTime,
    },
    (err, token) => {
      if (err) throw err
      res.status(200).json({
        token,
      })
    },
  )
}
