const { mongoose } = require('../database/database');

const stockSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    type: {
      type: String,
      enum: ['in', 'out'],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    description: String,
    recordedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Stock = mongoose.model('Stock', stockSchema);
module.exports = Stock;
