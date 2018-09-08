const mongoose = require('mongoose');
const ReviewModel = require('../models/Review');
const Review = mongoose.model('Review');

exports.create = async (reviewData) => {
  try {
    reviewData.map(async data => {
      const review = new Review(data);
      await review.save();
    });
  } catch (err) {
    throw err;
  }
};

exports.readAll = async () => {
  try {
    return await Review.find({}, { '__v': 0 });
  } catch (err) {
    throw err;
  }
};

exports.readById = async (id) => {
  try {
    return await Review.findById(id, { '__v': 0 });
  } catch (err) {
    throw err;
  }
};

exports.update = async (id, data) => {
  try {
    return await Review.findByIdAndUpdate(id, data, { new: true });
  } catch (err) {
    throw err;
  }
};

exports.delete = async (id) => {
  try {
    return await Review.findByIdAndRemove(id);
  } catch (err) {
    throw err;
  }
};
