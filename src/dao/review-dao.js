const mongoose = require("mongoose");

const ReviewModel = require("../models/Review");
const Review = mongoose.model("Review");

exports.create = async data => {
  try {
    const review = new Review(data);
    return await review.save();
  } catch (err) {
    throw err;
  }
};

exports.createInBatch = async reviews => {
  try {
    await reviews.map(async data => {
      const review = new Review(data);
      await review.save();
    });
  } catch (err) {
    throw err;
  }
};

exports.readAll = async () => {
  try {
    return await Review.find({});
  } catch (err) {
    throw err;
  }
};

exports.readById = async id => {
  try {
    return await Review.findById(id);
  } catch (err) {
    throw err;
  }
};

exports.update = async (id, data) => {
  try {
    return await Review.findByIdAndUpdate(id, { $set: data }, { new: true });
  } catch (err) {
    throw err;
  }
};

exports.delete = async id => {
  try {
    return await Review.findByIdAndRemove(id);
  } catch (err) {
    throw err;
  }
};
