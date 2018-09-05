const debug = require('debug')('bon-appetit-api:restaurant-controller');
const RestaurantDAO = require('../dao/restaurant-dao');

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

    if (restaurant) {
      return res.status(200).json({
        restaurant,
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
