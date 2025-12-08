// File index untuk export semua middleware
const errorHandler = require('./errorHandler');
const logger = require('./logger');
const authMiddleware = require('./authMiddleware');
const validateRequest = require('./validateRequest');

module.exports = {
  errorHandler,
  logger,
  authMiddleware,
  validateRequest,
};
