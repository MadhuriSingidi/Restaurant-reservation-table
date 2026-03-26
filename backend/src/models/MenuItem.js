const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  category: {
    type: String,
    enum: ['Breakfast', 'Starters', 'Main Course', 'Breads', 'Rice & Biryani', 'Desserts', 'Beverages', 'Soups', 'Raita'],
    required: true,
  },
  image: { type: String, default: '' },
  rating: { type: Number, default: 4.0, min: 0, max: 5 },
  ratingCount: { type: Number, default: 0 },
  isVeg: { type: Boolean, default: true },
  isAvailable: { type: Boolean, default: true },
  isPopular: { type: Boolean, default: false },
  spiceLevel: { type: String, enum: ['Mild', 'Medium', 'Hot', 'Extra Hot'], default: 'Medium' },
  prepTime: { type: Number, default: 20 }, // in minutes
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
