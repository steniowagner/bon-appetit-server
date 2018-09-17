const mongoose = require('../db');

const EventSchema = ({
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
  dishesTypes: [{
    type: String,
    enum: ['Barbecue', 'Dessert', 'Fast-Food', 'Homemade', 'Japanase', 'Pasta', 'Pizza', 'Salad', 'Seafood'],
    required: true,
  }],
  restaurantsParticipating: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Event', EventSchema);
