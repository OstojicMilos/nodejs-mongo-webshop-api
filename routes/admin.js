const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.post('/products', adminController.addProduct);

router.put('/products/:productId', adminController.editProduct);

router.delete('/products/:productId', adminController.deleteProduct);

module.exports = router;
