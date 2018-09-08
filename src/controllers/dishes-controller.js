const debug = require('debug')('bon-appetit-api:dishes-controller');
const mongoose = require('../db');

const DishesDAO = require('../dao/dishes-dao');
const RestaurantDAO = require('../dao/restaurant-dao');
const ReviewDAO = require('../dao/review-dao');

const shuffleArray = require('../utils/shuffle-array');

const _getRandomRestaurant = async (dishesTypes) => {
  const allRestaurants = await RestaurantDAO.readByDisheType(dishesTypes);

  const restaurantsShuffled = shuffleArray(allRestaurants);

  const MAX_RANDOM_NUMBER = 2;
  const MIN_RANDOM_NUMBER = 1;

  const randomNumber = Math.floor(Math.random() * (MAX_RANDOM_NUMBER - MIN_RANDOM_NUMBER + 1)) + MIN_RANDOM_NUMBER;

  const restaurant = {
    closeAt: restaurantsShuffled[0].operatingHours.close,
    name: restaurantsShuffled[0].name,
    id: restaurantsShuffled[0].id,
    isOpen: (randomNumber % 2 === 0),
  };

  return restaurant;
};

const _getRandomReviews = async (numberReviews) => {
  const allReviews = await ReviewDAO.readAll();

  const reviewsShuffled = shuffleArray(allReviews);

  return reviewsShuffled.slice(0, numberReviews);
};

exports.create = async (req, res, next) => {
  try {
    await DishesDAO.create(req.body);

    return res.status(201).json({
      message: 'Dishe Created with Success!',
    });
  } catch (err) {
    debug(err);

    return res.status(500).send({
      message: 'Error when trying to Create Dishes.',
    });
  }
};

exports.readAll = async (req, res, next) => {
  try {
    const dishes = await DishesDAO.readAll();
    
    return res.status(200).json({
      dishes,
    });
  } catch (err) {
    debug(err);

    return res.status(500).send({
      message: 'Error when trying to Read All Dishes.',
    });
  }
};

exports.readById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: `The field 'id' mandatory.`,
      });
    }

    const dishe = await DishesDAO.readById(id);

    if (dishe) {
      const restaurant = await _getRandomRestaurant(dishe.type);
      const reviews = await _getRandomReviews(dishe.reviews);

      return res.status(200).json({
        dishe,
        restaurant,
        reviews,
      });
    }

    return res.status(404).json({
      message: 'Dishe Not Found',
    });
  } catch (err) {
    debug(err);

    return res.status(500).json({
      message: 'Error when trying to Read Dishe.',
    });
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;

    const disheUpdated = await DishesDAO.update(id, { ...req.body });

    return res.status(200).json({
      disheUpdated,
    });
  } catch (err) {
    debug (err);

    return res.status(500).json({
      message: 'Error when trying to Update Dishe.',
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: `The field 'id' is mandatory`,
      });
    }

    const disheDeleted = await DishesDAO.delete(id);

    if (disheDeleted) {
      return res.status(200).json({
        message: 'Dishe Deleted with Success!',
      });
    }

    return res.status(404).json({
      message: 'Dishe Not Found',
    });
  } catch (err) {
    debug(err);

    return res.status(500).json({
      message: 'Error when trying to Delete Dishe.',
    });
  }
};
