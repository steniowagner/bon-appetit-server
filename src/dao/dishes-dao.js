const mongoose = require("mongoose");

const DishesModel = require("../models/Dishes");
const Dishes = mongoose.model("Dishes");

exports.create = async dishesData => {
  try {
    dishesData.map(async data => {
      const dishes = new Dishes(data);
      await dishes.save();
    });
  } catch (err) {
    throw err;
  }
};

exports.readAll = async () => {
  try {
    return await Dishes.find({}, { __v: 0 });
  } catch (err) {
    throw err;
  }
};

exports.readBasedDishesType = async dishesTypes => {
  try {
    const dishesFilteredByType = await Dishes.find({
      type: {
        $in: dishesTypes
      }
    });

    return dishesFilteredByType.map(dish => ({
      ...dish._doc,
      id: dish._doc._id
    }));
  } catch (err) {
    throw err;
  }
};

exports.readById = async id => {
  try {
    return await Dishes.findById(id, { __v: 0 });
  } catch (err) {
    throw err;
  }
};

exports.update = async (id, data) => {
  try {
    return await Dishes.findByIdAndUpdate(id, data, { new: true });
  } catch (err) {
    throw err;
  }
};

exports.delete = async id => {
  try {
    return await Dishes.findByIdAndRemove(id);
  } catch (err) {
    throw err;
  }
};
