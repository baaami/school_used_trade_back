var express = require('express')
var router = express.Router()
var home = require('./home.ctrl')

import checkToken from '../../lib/checkToken'

router.post('/', checkToken, home.board)

module.exports = router
