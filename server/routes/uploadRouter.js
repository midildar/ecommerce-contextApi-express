const router = require('express').Router()
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const uploadControl = require('../controllers/uploadControl')

router.post('/upload',auth,authAdmin, uploadControl.uploadImage)
router.post('/destroy',auth,authAdmin,uploadControl.deleteImage)

module.exports = router