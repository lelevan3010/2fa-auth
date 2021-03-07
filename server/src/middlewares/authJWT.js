import jwt from 'jsonwebtoken'

export const authJWT = (req, res, next) => {
  // Authentication header with Bearer
  const authHeader = req.headers.authorization

  if (authHeader) {
    // remove 'Bearer' from the string, keep the token
    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .json({ Auth: { loggedIn: false, invalidToken: true } })
      }
      req._id = decoded.user
      next()
    })
  } else {
    res.sendStatus(401)
  }
}
