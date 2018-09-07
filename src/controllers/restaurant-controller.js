const debug = require('debug')('bon-appetit-api:restaurant-controller');

const RestaurantDAO = require('../dao/restaurant-dao');
const DishesDAO = require('../dao/dishes-dao');

const shuffleArray = require('../utils/shuffle-array');

const _getDishesArray = (dishes, disheType) => {
  const dishesFiltered = dishes.filter(dishe => dishe.type === disheType)
  const shuffledArray = shuffleArray(dishesFiltered);
  
  const MAX_VALUE_RANDOM_NUMBER = dishes.length;
  const MIN_VALUE_RANDOM_NUMBER = 1;

  const randomNumber = Math.floor(Math.random() * (MAX_VALUE_RANDOM_NUMBER - MIN_VALUE_RANDOM_NUMBER + 1)) + MIN_VALUE_RANDOM_NUMBER;

  const dishesArray = shuffledArray.slice(0, randomNumber);

  return dishesArray;
};

const _getRestaurantMenu = async (dishesTypes) => {
  const dishes = await DishesDAO.readBasedDishesType(dishesTypes);
  
  const menu = [];

  dishesTypes.forEach(disheType => {
    menu.push({
      [disheType]: _getDishesArray(dishes, disheType),
    });
  });

  return menu;
};

exports.create = async (req, res, next) => {
  try {
    const { _id } = await RestaurantDAO.create({ ...req.body });

    return res.status(201).json({
      message: 'Restaurant created with Success!',
      id: _id,
    });
  } catch (err) {
    debug(err);

    return res.status(500).json({
      message: 'Error when trying to Create Restaurant.',
    });
  }
};

exports.readAll = async (req, res, next) => {
  try {
    const restaurants = await RestaurantDAO.readAll();

    return res.status(200).json({
      restaurants,
    });
  } catch (err) {
    debug(err);

    return res.status(500).json({
      message: 'Error when trying to Read All Restaurant.',
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

    const restaurant = await RestaurantDAO.readById(id);
    const menu = await _getRestaurantMenu(restaurant.dishesTypes);

    if (restaurant) {
      return res.status(200).json({
        restaurant,
        menu,
      });
    }

    return res.status(404).json({
      message: 'Restaurant Not Found',
    });
  } catch (err) {
    debug (err);

    return res.status(500).json({
      message: 'Error when trying to Read Restaurant.',
    });
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        message: `The field 'id' mandatory.`,
      });
    }

    const restaurantUpdated = await RestaurantDAO.update(id, { ...req.body });

    if (restaurantUpdated) {
      return res.status(200).json({
        restaurantUpdated,
      });
    }

    return res.status(404).json({
      message: 'Restaurant Not Found',
    });
  } catch (err) {
    debug(err);

    return res.status(500).json({
      message: 'Error when trying to Update Restaurant.',
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;

    const restaurantDeleted = await RestaurantDAO.delete(id);

    if (restaurantDeleted) {
      return res.status(200).json({
        message: 'Restaurant Deleted with Success!',
      });
    }

    return res.send(404).json({
      message: 'Restaurant Not Found',
    });
  } catch (err) {
    debug (err);

    return res.status(500).json({
      message: 'Error when trying to Delete Restaurant.',
    });
  }
};
