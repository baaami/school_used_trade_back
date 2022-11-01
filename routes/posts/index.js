var express = require('express')
const { default: checkToken } = require('../../lib/checkToken')
var router = express.Router()

var posts = require('./posts.ctrl')

/* GET posts page. */
router.post('/', posts.list)

module.exports = router
