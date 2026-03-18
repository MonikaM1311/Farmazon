const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, enum: ['fruit', 'vegetable', 'grain', 'dairy', 'other'], required: true },
  image: { type: String, default: '' },
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  farmerName: { type: String },
  harvestDate: { type: Date },
  stock: { type: Number, default: 100 },
  unit: { type: String, default: 'kg' },
}, { timestamps: true });

productSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);
