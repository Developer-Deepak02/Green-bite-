const express = require("express");

const router = express.Router();

const {
	createMenuItem,
	getMenuItems,
	getMenuItemById,
	getAllMenuItemsAdmin,
	updateMenuItem,
	deleteMenuItem,
	toggleAvailability,
} = require("../controllers/menuController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

/**
 * @swagger
 * tags:
 *   name: Menu
 *   description: Menu management APIs
 */

/**
 * @swagger
 * /api/menu:
 *   get:
 *     summary: Get all menu items
 *     tags: [Menu]
 *     responses:
 *       200:
 *         description: Menu items fetched successfully
 */

/**
 * @swagger
 * /api/menu/{id}:
 *   get:
 *     summary: Get single menu item
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Menu item fetched successfully
 *       404:
 *         description: Item not found
 */

/**
 * @swagger
 * /api/menu:
 *   post:
 *     summary: Create menu item
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - category
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *                 example: Veg Burger
 *               description:
 *                 type: string
 *                 example: Tasty burger
 *               price:
 *                 type: number
 *                 example: 199
 *               category:
 *                 type: string
 *                 example: 680000000000000000000000
 *               preparationTime:
 *                 type: number
 *                 example: 15
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Menu item created successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/menu/{id}:
 *   put:
 *     summary: Update menu item
 *     tags: [Menu]
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
 *         description: Menu item updated successfully
 */

/**
 * @swagger
 * /api/menu/{id}:
 *   delete:
 *     summary: Delete menu item
 *     tags: [Menu]
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
 *         description: Menu item deleted successfully
 */

/**
 * @swagger
 * /api/menu/{id}/toggle:
 *   patch:
 *     summary: Toggle menu item availability
 *     tags: [Menu]
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
 *         description: Availability updated successfully
 */

// ================= PUBLIC =================

// Get all menu items
router.get("/", getMenuItems);

// Get single menu item
router.get("/:id", getMenuItemById);

// ================= ADMIN =================

// Create menu item with image upload
router.post("/", protect, adminOnly, upload.single("image"), createMenuItem);

// Update menu item with optional image upload
router.put("/:id", protect, adminOnly, upload.single("image"), updateMenuItem);

// Delete menu item
router.delete("/:id", protect, adminOnly, deleteMenuItem);

// Toggle availability
router.patch("/:id/toggle", protect, adminOnly, toggleAvailability);

// Get all menu items for admin
router.get("/admin/all", protect, adminOnly, getAllMenuItemsAdmin);

module.exports = router;
