const router = require('express').Router()
const productControl = require('../controllers/productControl')

router.route('/product')
    .get(productControl.getProduct)
    .post(productControl.createProduct)

router.route('/product/:id')
    .delete(productControl.deleteProduct)
    .put(productControl.updateProduct)

module.exports = router