var express = require('express')
var router = express.Router()
var post = require('./post.ctrl')

import checkToken from '../../lib/checkToken'

const multer = require('multer')

const storage  = multer.diskStorage({ // 2
    destination(req, file, cb) {
      cb(null, 'public/images/');
    },
    filename(req, file, cb) {
      cb(null, `${Date.now()}__${file.originalname}`);
    },
});

const upload = multer({ storage: storage }); // 3-2

router.get('/read', post.read)
router.post('/write', upload.single('image'), post.write)
router.patch('/update', upload.single('image'), post.update)
router.delete('/remove', post.remove)

module.exports = router
