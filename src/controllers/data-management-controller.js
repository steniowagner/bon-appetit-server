const debug = require("debug")("bon-appetit-api:dishes-controller");

const RestaurantDAO = require("../dao/restaurant-dao");
const ReviewDAO = require("../dao/review-dao");
const EventDAO = require("../dao/event-dao");
const DishDAO = require("../dao/dish-dao");

const restaurants = require("../json-models/restaurants.json");
const reviews = require("../json-models/reviews.json");
const events = require("../json-models/events.json");
const dishes = require("../json-models/dishes");

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
      message: "Error when trying to Populate the Database."
    });
  }
};

const clearDataset = async daoInstance => {
  try {
    const dataset = await daoInstance.readAll();

    await dataset.map(async data => await daoInstance.delete(data.id));
  } catch (err) {
    throw err;
  }
};

exports.clear = async (req, res, next) => {
  try {
    await clearDataset(RestaurantDAO);
    await clearDataset(ReviewDAO);
    await clearDataset(DishDAO);
    await clearDataset(EventDAO);

    return res.status(201).json({
      message: "Database Cleared!"
    });
  } catch (err) {
    debug(err);

    return res.status(500).json({
      message: "Error when trying to Clear the Database."
    });
  }
};
