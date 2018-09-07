const mongoose = require('../db');

const DishesSchema = ({
  imageURL: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Barbecue', 'Dessert', 'Fast-Food', 'Homemade', 'Japanase', 'Pasta', 'Pizza', 'Salad', 'Seafood'],
    require: true,
  },
  stars: {
    type: Number,
    required: true,
  },
  reviews: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    require: true,
  },
  ingredients: {
    type: [String],
    require: true,
  },
});

module.exports = mongoose.model('Dishes', DishesSchema);
