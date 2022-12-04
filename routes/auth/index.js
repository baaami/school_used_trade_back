var express = require('express')
var router = express.Router()

var auth = require('./auth.ctrl')

router.post('/callback/kakao', auth.kakao)
router.post('/logout/kakao', auth.logout)

module.exports = router
