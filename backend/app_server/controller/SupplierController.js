const Supplier = require('../model/Supplier');

class SupplierController {
  static async getAll(req, res) {
    try {
      const suppliers = await Supplier.find();
      res.status(200).json({
        success: true,
        message: 'Suppliers retrieved',
        data: suppliers,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const supplier = await Supplier.findById(req.params.id);
      if (!supplier) {
        return res.status(404).json({ success: false, message: 'Supplier not found' });
      }
      res.status(200).json({ success: true, data: supplier });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async create(req, res) {
    try {
      const { name, email, phone, address, city } = req.body;
      if (!name) {
        return res.status(400).json({ success: false, message: 'Name required' });
      }
      const supplier = await Supplier.create({ name, email, phone, address, city });
      res.status(201).json({ success: true, message: 'Supplier created', data: supplier });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { name, email, phone, address, city } = req.body;
      const supplier = await Supplier.findByIdAndUpdate(
        req.params.id,
        { name, email, phone, address, city },
        { new: true }
      );
      if (!supplier) {
        return res.status(404).json({ success: false, message: 'Supplier not found' });
      }
      res.status(200).json({ success: true, message: 'Supplier updated', data: supplier });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const supplier = await Supplier.findByIdAndDelete(req.params.id);
      if (!supplier) {
        return res.status(404).json({ success: false, message: 'Supplier not found' });
      }
      res.status(200).json({ success: true, message: 'Supplier deleted' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = SupplierController;
