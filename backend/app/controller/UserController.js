// Controller untuk User
const User = require('../model/User');

class UserController {
  // GET semua users
  static getAll(req, res) {
    try {
      const users = User.getAll();
      res.status(200).json({
        success: true,
        message: 'Users retrieved successfully',
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // GET user by ID
  static getById(req, res) {
    try {
      const { id } = req.params;
      const user = User.getById(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }
      res.status(200).json({
        success: true,
        message: 'User retrieved successfully',
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // CREATE user baru
  static create(req, res) {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Name, email, and password are required',
        });
      }
      const user = User.create({ name, email, password });
      res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // UPDATE user
  static update(req, res) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;
      const success = User.update(id, { name, email, password });
      if (!success) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }
      res.status(200).json({
        success: true,
        message: 'User updated successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // DELETE user
  static delete(req, res) {
    try {
      const { id } = req.params;
      const success = User.delete(id);
      if (!success) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }
      res.status(200).json({
        success: true,
        message: 'User deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = UserController;
