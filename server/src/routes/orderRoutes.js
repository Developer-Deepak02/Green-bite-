const express = require("express");
const router = express.Router();
const {
	createOrder,
	getUserOrders,
	getOrderById,
	getAllOrders,
	updateOrderStatus,
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management APIs
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *               - address
 *             properties:
 *               items:
 *                 type: array
 *               address:
 *                 type: string
 *                 example: 680000000000000000000000
 *               couponCode:
 *                 type: string
 *                 example: SAVE10
 *               paymentMethod:
 *                 type: string
 *                 example: cod
 *     responses:
 *       201:
 *         description: Order created successfully
 */

/**
 * @swagger
 * /api/orders/my:
 *   get:
 *     summary: Get logged-in user's orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 */

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get single order details
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order fetched successfully
 *       404:
 *         description: Order not found
 */

/**
 * @swagger
 * /api/orders/admin:
 *   get:
 *     summary: Get all orders (Admin)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 */

/**
 * @swagger
 * /api/orders/admin/{id}/status:
 *   put:
 *     summary: Update order status (Admin)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 example: delivered
 *     responses:
 *       200:
 *         description: Order status updated successfully
 */
// ================= USER =================
// Create order
router.post("/", protect, createOrder);
// Get user's orders
router.get("/my", protect, getUserOrders);
// ================= ADMIN =================
// Get ALL orders (admin only)
router.get("/admin", protect, isAdmin, getAllOrders);
// Update order status (admin only)
router.get("/:id", protect, getOrderById);
// Get single order details
router.put("/admin/:id/status", protect, isAdmin, updateOrderStatus);

module.exports = router;
