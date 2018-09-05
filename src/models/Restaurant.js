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
    enum: ['BARBECUE', 'DESSERT', 'FAST-FOOD', 'HOMEMADE', 'JAPANESE', 'PASTA', 'PIZZA', 'SALAD', 'SEAFOOD'],
    required: true,
  }]
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
