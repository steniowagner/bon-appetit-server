const mongoose = require('mongoose');
const RestaurantModel = require('../models/Restaurant');
const Restaurant = mongoose.model('Restaurant');

const calculateDistanceCoordinates = require('../utils/calculate-distance-coordinates');

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

exports.filter = async (userCoordinates, maxDistance, types) => {
  try {
    return await Restaurant.aggregate()
      .unwind('$dishesTypes')      
      .match({ dishesTypes: { $in: types }})
      .group({ _id: '$_id', restaurants: { $push: '$$ROOT' }})
      .then((res, err) => {
        if (!err) {
          const restaurants = res.filter(item => {
            const { coordinates } = item.restaurants[0].location;
            
            const distanceBetweenCoordinates = calculateDistanceCoordinates(userCoordinates, {
              latitude: coordinates[0],
              longitude: coordinates[1],
            });

            const isNear = (distanceBetweenCoordinates <= maxDistance);

            return isNear;
          }).map(item => ({
            _id: item.restaurants[0]._id,
            name: item.restaurants[0].name,
            imageURL: item.restaurants[0].imageURL,
            address: item.restaurants[0].location.address,
            stars: item.restaurants[0].stars,
          }));

          return restaurants;
        }
      });
  } catch (err) {
    throw err;
  }
};
