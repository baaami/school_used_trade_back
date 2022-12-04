const jwt = require('./jwt')
const secretKey = require('./secretkey').secretKey
import { User } from '../models'

const checkToken = async (req, res, next) => {
  const authorization = req.headers['authorization']

  if (authorization === undefined) {
    res.send(404)
  }
  const token = authorization.replace('Bearer', '').trim()
  if (!token) {
    res.send(401)
    console.error('token not exit')
    return
  } else {
    try {
      // verify를 통해 값 decode
      const { id } = await jwt.verify(token, secretKey)

      // decoded_id를 DB에서 조회하여 사용자 find
      const ExistUser = await User.findOne({
        where: { snsid: id },
      })

      if (ExistUser) {
        req.user = ExistUser.toJSON()
        req.body.userid = req.user.id
      } else {
        res.send(401)
      }
      return next()
    } catch (err) {
      console.error(err)
      res.send(401)
      return
    }
  }
}

export default checkToken
