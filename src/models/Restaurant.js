const mongoose = require('../db');

const RestaurantSchema = ({
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
    coordinates: {
      type: [Number, Number],
      default: [0, 0]
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

module.exports = mongoose.model('Restaurant', RestaurantSchema);
