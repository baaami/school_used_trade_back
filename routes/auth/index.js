var express = require('express')
var router = express.Router()

var auth = require('./auth.ctrl')

router.post('/callback/kakao', auth.kakao)

module.exports = router
