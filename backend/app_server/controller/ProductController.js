// Controller untuk Product
const Product = require('../model/Product');
const Category = require('../model/Category');
const Stock = require('../model/Stock');

class ProductController {
  // GET semua produk
  static async getAll(req, res) {
    try {
      const products = await Product.find()
        .populate('createdBy', 'name email')
        .populate('updatedBy', 'name email');
      
      res.status(200).json({
        success: true,
        message: 'Products retrieved successfully',
        data: products,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // GET produk by ID
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findById(id)
        .populate('createdBy', 'name email')
        .populate('updatedBy', 'name email');
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found',
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Product retrieved successfully',
        data: product,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // CREATE produk baru + auto create kategori + auto create stok
  static async create(req, res) {
    try {
      const { name, description, category, price, quantity, sku, image } = req.body;

      // Validasi input
      if (!name || !category || !price || !sku) {
        return res.status(400).json({
          success: false,
          message: 'Name, category, price, and SKU are required',
        });
      }

      // Cek apakah SKU sudah ada
      const existingProduct = await Product.findOne({ sku });
      if (existingProduct) {
        return res.status(409).json({
          success: false,
          message: 'SKU already exists',
        });
      }

      // AUTO CREATE KATEGORI JIKA BELUM ADA
      let categoryRecord = await Category.findOne({ name: category });
      if (!categoryRecord) {
        categoryRecord = await Category.create({
          name: category,
          description: `Category for ${category}`,
        });
      }

      // Buat produk baru
      const product = await Product.create({
        name,
        description,
        category,
        price,
        quantity: quantity || 0,
        sku,
        image,
        createdBy: req.user.id,
      });

      // AUTO CREATE INITIAL STOCK RECORD
      if (quantity > 0) {
        await Stock.create({
          product: product._id,
          type: 'in',
          quantity: quantity,
          description: 'Initial stock',
          recordedBy: req.user.id,
        });
      }

      res.status(201).json({
        success: true,
        message: 'Product created successfully with category and stock initialized',
        data: product,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // UPDATE produk
  static async update(req, res) {
    try {
      const { id } = req.params;
      const { name, description, category, price, quantity, sku, image } = req.body;

      const product = await Product.findByIdAndUpdate(
        id,
        {
          name,
          description,
          category,
          price,
          quantity,
          sku,
          image,
          updatedBy: req.user.id,
        },
        { new: true }
      );

      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Product updated successfully',
        data: product,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // DELETE produk
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findByIdAndDelete(id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = ProductController;
