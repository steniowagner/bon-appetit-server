const mongoose = require("../db");

const RestaurantDAO = require("../dao/restaurant-dao");
const ReviewDAO = require("../dao/review-dao");
const DishDAO = require("../dao/dish-dao");

const shuffleArray = require("../utils/shuffle-array");

const MAX_DISHES_HOME_SECTION = 20;

const _getRandomRestaurant = async dishesTypes => {
  const allRestaurants = await RestaurantDAO.readByDishType(dishesTypes);

  const restaurant = shuffleArray(allRestaurants)[0];

  return restaurant;
};

const _getRandomReviews = async numberOfReviews => {
  const allReviews = await ReviewDAO.readAll();

  const reviewsShuffled = shuffleArray(allReviews);

  return reviewsShuffled.slice(0, numberOfReviews);
};

exports.create = async (req, res, next) => {
  try {
    const { id } = await DishDAO.create(req.body);

    return res.status(201).json({
      id
    });
  } catch (error) {
    return res.status(500).send({
      error
    });
  }
};

exports.createInBatch = async (req, res, next) => {
  try {
    await DishDAO.createInBatch(req.body);

    return res.status(201).json({
      message: "Dish created with Success!"
    });
  } catch (error) {
    debug(error);

    return res.status(500).json({
      message: "Error when trying to Create Dishes."
    });
};

exports.readAll = async (req, res, next) => {
  try {
    const allDishes = await DishDAO.readAll();
    const shuffledDishesArray = shuffleArray(allDishes);
    const dishes = shuffledDishesArray.slice(0, MAX_DISHES_HOME_SECTION);

    return res.status(200).json({
      dishes
    });
  } catch (error) {
    return res.status(500).send({
      error
    });
  }
};

exports.readById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "The field id is required."
      });
    }

    const dish = await DishDAO.readById(id);

    if (!dish) {
      return res.status(404).json({
        message: "Dish Not Found"
      });
    }

    const restaurant = await _getRandomRestaurant(dish.type);
    const reviews = await _getRandomReviews(dish.reviews);

    return res.status(200).json({
      restaurant,
      reviews,
      dish
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "The field id is required."
      });
    }

    const dishUpdated = await DishDAO.update(id, { ...req.body });

    if (!dishUpdated) {
      return res.status(404).json({
        message: "Dish Not Found"
      });
    }

    return res.status(200).json({
      dishUpdated
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "The field id is required"
      });
    }

    const dishDeleted = await DishDAO.delete(id);

    if (!dishDeleted) {
      return res.status(404).json({
        message: "Dish Not Found"
      });
    }

    return res.status(200);
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
};
