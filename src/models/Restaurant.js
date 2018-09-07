const mongoose = require('../db');

const RestaurantSchema = new mongoose.Schema({
  imageURL: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
  },
  location: {
    type: {
      type: String,
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
    },
    address: {
      type: String,
      required: true,
    },
  },
  operatingHours: {
    open: {
      type: String,
      required: true,
    },
    close: {
      type: String,
      required: true,
    },
  },
  dishesTypes: [{
    type: String,
    enum: ['Barbecue', 'Dessert', 'Fast-Food', 'Homemade', 'Japanase', 'Pasta', 'Pizza', 'Salad', 'Seafood'],
    required: true,
  }]
});

RestaurantSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Restaurant', RestaurantSchema);
