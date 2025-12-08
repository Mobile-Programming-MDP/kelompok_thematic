// Router untuk User
const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController');

// Routes untuk User
router.get('/', UserController.getAll);
router.get('/:id', UserController.getById);
router.post('/', UserController.create);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);

module.exports = router;
