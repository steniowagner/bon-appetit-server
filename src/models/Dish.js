const mongoose = require("../db");

const DishSchema = new mongoose.Schema({
  imageURL: {
    type: String,
    required: true
  },
  thumbnailImageURL: {
    type: String,
    required: true
  },
  mediumImageURL: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: [
      "Barbecue",
      "Dessert",
      "Fast-Food",
      "Homemade",
      "Japanese",
      "Pasta",
      "Pizza",
      "Salad",
      "Seafood"
    ],
    required: true
  },
  stars: {
    type: Number,
    required: true
  },
  reviews: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    require: true
  },
  ingredients: {
    type: [String],
    require: true
  }
});

DishSchema.set("toJSON", {
  transform: function(doc, returned, options) {
    returned.id = returned._id;
    delete returned._id;
  }
});

module.exports = mongoose.model("Dish", DishSchema);
