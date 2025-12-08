const Stock = require('../model/Stock');

class StockController {
  static async getAll(req, res) {
    try {
      const stocks = await Stock.find()
        .populate('product', 'name sku')
        .populate('recordedBy', 'name');
      res.status(200).json({
        success: true,
        message: 'Stocks retrieved',
        data: stocks,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async create(req, res) {
    try {
      const { product, type, quantity, description } = req.body;
      if (!product || !type || !quantity) {
        return res.status(400).json({ success: false, message: 'Product, type, quantity required' });
      }
      const stock = await Stock.create({
        product,
        type,
        quantity,
        description,
        recordedBy: req.user.id,
      });
      res.status(201).json({ success: true, message: 'Stock recorded', data: stock });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getByProduct(req, res) {
    try {
      const stocks = await Stock.find({ product: req.params.productId })
        .populate('product', 'name')
        .populate('recordedBy', 'name');
      res.status(200).json({ success: true, data: stocks });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = StockController;
