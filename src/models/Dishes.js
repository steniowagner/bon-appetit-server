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
  category: {
    type: String,
    enum: ['BARBECUE', 'DESSERT', 'FAST-FOOD', 'HOMEMADE', 'JAPANESE', 'PASTA', 'PIZZA', 'SALAD', 'SEAFOOD'],
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
