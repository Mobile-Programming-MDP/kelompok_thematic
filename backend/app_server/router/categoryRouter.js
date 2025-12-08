const express = require('express');
const router = express.Router();
const CategoryController = require('../controller/CategoryController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', CategoryController.getAll);
router.get('/:id', CategoryController.getById);
router.post('/', authMiddleware, CategoryController.create);
router.put('/:id', authMiddleware, CategoryController.update);
router.delete('/:id', authMiddleware, CategoryController.delete);

module.exports = router;
