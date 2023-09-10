const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controllers/productController');
const { isAuthenticated, authorizeRoles } = require('../middleware/auth');
const router = express.Router(); 

router.route("/products").get(isAuthenticated, getAllProducts); 
router.route("/product/:id").get(getProductDetails)

//admin routes
router.route("/admin/product/new").post(isAuthenticated, authorizeRoles("admin"), createProduct);
router.route("/admin/product/:id").put(isAuthenticated, authorizeRoles('admin'), updateProduct).delete(isAuthenticated, authorizeRoles("admin"), deleteProduct);

module.exports = router;  