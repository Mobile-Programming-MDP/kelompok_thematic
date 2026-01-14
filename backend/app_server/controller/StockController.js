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

  // KELUARKAN STOK - Mengurangi stok produk dan membuat record stock out
  static async stockOut(req, res) {
    try {
      const { product, quantity, description } = req.body;

      // Validasi input
      if (!product || !quantity) {
        return res.status(400).json({ 
          success: false, 
          message: 'Product dan quantity harus diisi' 
        });
      }

      if (quantity <= 0) {
        return res.status(400).json({ 
          success: false, 
          message: 'Quantity harus lebih dari 0' 
        });
      }

      // Import Product model
      const Product = require('../model/Product');

      // Cek produk dan stok tersedia
      const productData = await Product.findById(product);
      if (!productData) {
        return res.status(404).json({ 
          success: false, 
          message: 'Produk tidak ditemukan' 
        });
      }

      // Cek apakah stok mencukupi
      if (productData.quantity < quantity) {
        return res.status(400).json({ 
          success: false, 
          message: `Stok tidak mencukupi. Stok tersedia: ${productData.quantity}` 
        });
      }

      // Kurangi quantity produk
      productData.quantity -= quantity;
      await productData.save();

      // Buat record stock out
      const stockOut = await Stock.create({
        product,
        type: 'out',
        quantity,
        description: description || 'Pengeluaran stok',
        recordedBy: req.user.id,
      });

      // Populate untuk response
      await stockOut.populate('product', 'name sku');
      await stockOut.populate('recordedBy', 'name');

      res.status(201).json({ 
        success: true, 
        message: 'Stok berhasil dikeluarkan',
        data: {
          stock: stockOut,
          product: {
            id: productData._id,
            name: productData.name,
            remainingStock: productData.quantity
          }
        }
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: error.message 
      });
    }
  }
}

module.exports = StockController;
