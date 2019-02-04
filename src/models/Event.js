const mongoose = require("../db");

const EventSchema = new mongoose.Schema({
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
  smallImageURL: {
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
  dishesTypes: [
    {
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
    }
  ],
  restaurantsParticipating: {
    type: Number,
    required: true
  }
});

EventSchema.set("toJSON", {
  transform: function(doc, returned, options) {
    returned.id = returned._id;
    delete returned._id;
  }
});

module.exports = mongoose.model("Event", EventSchema);
