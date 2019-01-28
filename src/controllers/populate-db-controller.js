const RestaurantDAO = require("../dao/restaurant-dao");
const ReviewDAO = require("../dao/review-dao");
const EventDAO = require("../dao/event-dao");
const DishDAO = require("../dao/dish-dao");

const restaurants = require("../json-models/restaurants.json");
const reviews = require("../json-models/reviews.json");
const dishes = require("../json-models/dishes.json");
const events = require("../json-models/events.json");

exports.populate = async (req, res, next) => {
  try {
    await RestaurantDAO.createInBatch(restaurants);
    await ReviewDAO.createInBatch(reviews);
    await DishDAO.createInBatch(dishes);
    await EventDAO.createInBatch(events);

    return res.status(201).json({
      message: "Database Filled and Ready to Use!"
    });
  } catch (err) {
    debug(err);

    return res.status(500).json({
      message: "Error when trying to Populate Database."
    });
  }
};
