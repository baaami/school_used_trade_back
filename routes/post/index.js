var express = require('express')
var router = express.Router()
var post = require('./post.ctrl')

import checkToken from '../../lib/checkToken'

router.get('/read', post.read)
router.post('/write', checkToken, post.write)
router.patch('/update', checkToken, post.update)
router.delete('/remove', checkToken, post.remove)

module.exports = router
