// Controller untuk Authentication
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');

class AuthController {
  // REGISTER - Hanya Admin yang bisa register user baru
  static async register(req, res) {
    try {
      const { name, email, password, confirmPassword, role = 'user', department } = req.body;

      // Validasi input
      if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({
          success: false,
          message: 'Name, email, password, and confirm password are required',
        });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message: 'Passwords do not match',
        });
      }

      // Validasi role
      if (!['admin', 'user'].includes(role)) {
        return res.status(400).json({
          success: false,
          message: 'Role must be either admin or user',
        });
      }

      // Cek apakah email sudah terdaftar
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'Email is already registered',
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Buat user baru
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
        department,
      });

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          department: user.department,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // LOGIN
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validasi input
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email and password are required',
        });
      }

      // Cari user berdasarkan email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password',
        });
      }

      // Cek apakah user aktif
      if (!user.isActive) {
        return res.status(403).json({
          success: false,
          message: 'User account is inactive',
        });
      }

      // Verifikasi password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password',
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        { 
          id: user._id, 
          email: user.email,
          role: user.role,
          name: user.name
        },
        process.env.JWT_SECRET || 'your_jwt_secret_key',
        { expiresIn: '24h' }
      );

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          department: user.department,
          token,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // GET PROFILE (Memerlukan token)
  static async getProfile(req, res) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'Token is required',
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key');
      const user = await User.findById(decoded.id).select('-password');

      res.status(200).json({
        success: true,
        message: 'Profile retrieved successfully',
        data: user,
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: 'Invalid or expired token',
      });
    }
  }

  // LOGOUT (Optional - bisa dilakukan di client side)
  static logout(req, res) {
    res.status(200).json({
      success: true,
      message: 'Logout successful',
    });
  }
}

module.exports = AuthController;
