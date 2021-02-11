const jwt = require('jsonwebtoken')

const verifyToken = (token) => {
  try {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        throw Error('unauthorized')
      } else {
        return decodedToken
      }
    })
  } catch (err) {
    throw Error(err)
  }
}

// const verifyToken = async (token) => {
//   try {
//     return await jwt.verify(token, process.env.JWT_SECRET)
//   } catch (err) {
//     throw Error(err)
//   }
// }

module.exports = {
  verifyToken
}
