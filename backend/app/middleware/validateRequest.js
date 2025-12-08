// Middleware untuk validasi request body
const validateRequest = (schema) => {
  return (req, res, next) => {
    // Implementasi validasi menggunakan schema (Joi, Yup, atau custom)
    // Contoh sederhana:
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Request body is required',
      });
    }
    next();
  };
};

module.exports = validateRequest;
