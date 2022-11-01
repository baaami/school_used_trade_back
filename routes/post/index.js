var express = require('express')
var router = express.Router()
var post = require('./post.ctrl')

router.get('/read', post.read)
router.post('/write', post.write)
router.patch('/update', post.update)
router.delete('/remove', post.remove)

module.exports = router
