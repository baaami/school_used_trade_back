const axios = require('axios')
const jwt = require('../../lib/jwt')
import qs from 'querystring'
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
    res.send(505)
    return
  }

  const { access_token } = TokenFromkakao.data

  // 유저 데이터 요청
  try {
    UserFromkakao = await axios({
      method: 'get',
      url: 'https://kapi.kakao.com/v2/user/me',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        property_keys: ["kakao_account.profile"],
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
    console.log("User : ", user)
  }

  const dbdata = {
    snsid: user.id,
    nickname: user.properties.nickname,
  }

  // decoded_id를 DB에서 조회하여 사용자 find
  let ExistUser = await User.findOne({
    raw: true,
    where: { snsid: user.id },
  })

  if (!ExistUser) {
    // 유저 데이터 저장
    await User.create(dbdata)

    ExistUser = await User.findOne({
      raw: true,
      where: { snsid: user.id },
    })
  }

  // 자체 토큰 발급
  const jwtToken = await jwt.sign(user)
  const result = {
    token: jwtToken.token,
    user: ExistUser,
  }

  res.json(result)
}


export const logout = async (req, res, next) => {
  const authorization = req.headers['authorization']
  if (authorization === undefined) {
    // invalid header
    res.send(404)
  }
  const access_token = authorization.replace('Bearer', '').trim()

  // 유저 로그아웃
  try {
    LogoutFromkakao = await axios({
      method: 'post',
      url: 'https://kapi.kakao.com/v1/user/logout',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    console.log("LogoutFromkakao: ", LogoutFromkakao);
  } catch (err) {
    console.log('kakao login error : ', err)
    res.send(505)
  }
  
  res.send(204);
}