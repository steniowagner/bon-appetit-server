const mongoose = require('mongoose');
const RestaurantModel = require('../models/Restaurant');
const Restaurant = mongoose.model('Restaurant');

exports.create = async (data) => {
  try {
    const restaurant = new Restaurant(data);
    return await restaurant.save();
  } catch (err) {
    throw err;
  }
};

exports.readAll = async () => {
  try {
    return await Restaurant.find({}, { '__v': 0 });
  } catch (err) {
    throw err;
  }
};

exports.readById = async (id) => {
  try {
    return await Restaurant.findById(id);
  } catch (err) {
    throw err;
  }
};

exports.readByDisheType = async (disheType) => {
  try {
    return await Restaurant.find({ dishesTypes: disheType });
  } catch (err) {
    throw err;
  }
};

exports.update = async (id, data) => {
  try {
    return await Restaurant.findByIdAndUpdate(id, data, { new: true });
  } catch (err) {
    throw err;
  }
};

exports.delete = async (id) => {
  try {
    return await Restaurant.findByIdAndRemove(id);
  } catch (err) {
    throw err;
  }
};
