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
    enum: ['BARBECUE', 'DESSERT', 'FAST-FOOD', 'HOMEMADE', 'JAPANESE', 'PASTA', 'PIZZA', 'SALAD', 'SEAFOOD'],
    required: true,
  }],
  restaurantParticipating: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Event', EventSchema);
