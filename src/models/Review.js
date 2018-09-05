const mongoose = require('../db');

const ReviewSchema = ({
  name: {
    type: String,
    required: true,
  },
  profileImageURL: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: false,
    default: 0,
  }
});

module.exports = mongoose.model('Review', ReviewSchema);
