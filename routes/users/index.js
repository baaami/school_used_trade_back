var express = require('express')
var router = express.Router()

var users = require('./users.ctrl')

/* GET users listing. */
router.get('/', users.list)

module.exports = router
