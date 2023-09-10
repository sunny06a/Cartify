const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controllers/productController');
const { isAuthenticated, authorizeRoles } = require('../middleware/auth');
const router = express.Router(); 

router.route("/products").get(isAuthenticated, getAllProducts); 
router.route("/product/new").post(isAuthenticated, authorizeRoles("admin"), createProduct);
router.route("/product/:id").get(getProductDetails).put(isAuthenticated, authorizeRoles('user'), updateProduct).delete(isAuthenticated, authorizeRoles("admin"), deleteProduct);
module.exports = router;  