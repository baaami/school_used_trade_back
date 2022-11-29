const axios = require('axios')
const jwt = require('../../lib/jwt')
import { User } from '../../models'

export const kakao = async (req, res, next) => {
  // 인가 코드 획득
  const { code } = req.body
  console.log('[TEST] permission code: ', code)
  let TokenFromkakao, UserFromkakao

  // access 토큰 요청
  try {
    TokenFromkakao = await axios({
      method: 'POST',
      url: 'https://kauth.kakao.com/oauth/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({
        grant_type: 'authorization_code',
        client_id: process.env.KAKAO_ID,
        redirect_uri: process.env.KAKAO_CALLBACK_URL,
        code: code,
      }),
    })
  } catch (err) {
    console.log(err.response)
  }

  const { access_token } = TokenFromkakao.data
  console.log('access_token: ', access_token)

  // 유저 데이터 요청
  try {
    UserFromkakao = await axios({
      method: 'get',
      url: 'https://kapi.kakao.com/v2/user/me',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  } catch (err) {
    console.log('kakao login error : ', err)
    res.send(505)
  }

  let user
  if (UserFromkakao.status != 200) {
    console.log('Unknown error')
    res.send(505)
  } else {
    user = UserFromkakao.data
  }

  const dbdata = {
    snsid: user.id,
    nickname: user.properties.nickname,
  }

  // decoded_id를 DB에서 조회하여 사용자 find
  const ExistUser = await User.findOne({
    where: { snsid: user.id },
  })

  if (!ExistUser) {
    // 유저 데이터 저장
    User.create(dbdata)
  }

  // 자체 토큰 발급
  const jwtToken = await jwt.sign(user)
  const result = {
    token: jwtToken.token,
    user: user,
  }

  res.json(result)
}
