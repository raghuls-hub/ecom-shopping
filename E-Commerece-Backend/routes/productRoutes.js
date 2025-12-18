const express = require('express')
const router = express.Router()
const {getProducts,postProducts,deleteProducts,updateProducts}=require('../controllers/productControllers')

router.get('/getProducts',getProducts)
router.post('/postProducts',postProducts)
router.delete('/deleteProducts/:id',deleteProducts)
router.put('/updateProducts/:id',updateProducts)
module.exports = router;