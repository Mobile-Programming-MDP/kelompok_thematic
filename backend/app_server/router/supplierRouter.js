const express = require('express');
const router = express.Router();
const SupplierController = require('../controller/SupplierController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', SupplierController.getAll);
router.get('/:id', SupplierController.getById);
router.post('/', authMiddleware, SupplierController.create);
router.put('/:id', authMiddleware, SupplierController.update);
router.delete('/:id', authMiddleware, SupplierController.delete);

module.exports = router;
