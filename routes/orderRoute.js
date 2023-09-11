const express = require('express');
const { isAuthenticated, authorizeRoles } = require('../middleware/auth');
const { newOrder, getSingleOrder, myOrders, allOrders, updateOrder, deleteOrder } = require('../controllers/orderController');
const router = express.Router();    

router.route("/order/new").post(isAuthenticated, newOrder);
router.route("/order/:id").get(isAuthenticated, getSingleOrder);
router.route("/orders/me").get(isAuthenticated, myOrders);

//admin routes
router.route("/admin/orders").get(isAuthenticated, authorizeRoles("admin"), allOrders);
router.route("/admin/order/:id").put(isAuthenticated, authorizeRoles("admin"), updateOrder).delete(isAuthenticated, authorizeRoles("admin"), deleteOrder);

module.exports = router; 