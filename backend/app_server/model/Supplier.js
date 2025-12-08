const { mongoose } = require('../database/database');

const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: String,
    phone: String,
    address: String,
    city: String,
  },
  { timestamps: true }
);

const Supplier = mongoose.model('Supplier', supplierSchema);
module.exports = Supplier;
