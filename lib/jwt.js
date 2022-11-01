// const randToken = require('rand-token');
const jwt = require('jsonwebtoken')
const secretKey = require('./secretkey').secretKey
const options = require('./secretkey').option

const TOKEN_EXPIRED = -3
const TOKEN_INVALID = -2

module.exports = {
  sign: async user => {
    console.log('jwt data test: ', user.id)
    const payload = {
      id: user.id,
    }

    const incoded = {
      // access token 발급
      token: jwt.sign(payload, secretKey, options),
      // refreshToken: randToken.uid(256),
    }

    return incoded
  },
  verify: async token => {
    let decoded
    try {
      // verify를 통해 값 decode
      decoded = jwt.verify(token, secretKey)
    } catch (err) {
      if (err.message === 'jwt expired') {
        console.log('expired token')
        return TOKEN_EXPIRED
      } else {
        if (decoded) {
          console.log('invalid token : ', decoded)
        }
        return TOKEN_INVALID
      }
    }

    return decoded
  },
}
