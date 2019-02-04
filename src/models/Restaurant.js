const mongoose = require("../db");

const RestaurantSchema = new mongoose.Schema({
  imageURL: {
    type: String,
    required: true
  },
  mediumImageURL: {
    type: String,
    required: true
  },
  thumbnailImageURL: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  stars: {
    type: Number,
    required: true
  },
  location: {
    coordinates: {
      type: [Number],
      default: [0, 0]
    },
    address: {
      type: String,
      required: true
    }
  },
  operatingHours: {
    open: {
      type: String,
      required: true
    },
    close: {
      type: String,
      required: true
    }
  },
  dishesTypes: [
    {
      type: String,
      enum: [
        "Homemade",
        "Barbecue",
        "Fast-Food",
        "Pasta",
        "Pizza",
        "Dessert",
        "Japanese",
        "Salad",
        "Seafood"
      ],
      required: true
    }
  ]
});

RestaurantSchema.set("toJSON", {
  transform: function(doc, returned, options) {
    returned.id = returned._id;
    delete returned._id;
  }
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
