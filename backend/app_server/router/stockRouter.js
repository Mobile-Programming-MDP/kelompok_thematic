const express = require('express');
const router = express.Router();
const StockController = require('../controller/StockController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', StockController.getAll);
router.post('/', authMiddleware, StockController.create);
router.get('/product/:productId', StockController.getByProduct);

module.exports = router;
