// Router untuk Product
const express = require('express');
const router = express.Router();
const ProductController = require('../controller/ProductController');
const authMiddleware = require('../middleware/authMiddleware');

// Routes untuk Product (semua route memerlukan authentication)
router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getById);
router.post('/', authMiddleware, ProductController.create);
router.put('/:id', authMiddleware, ProductController.update);
router.delete('/:id', authMiddleware, ProductController.delete);

module.exports = router;
