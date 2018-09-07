const express = require('express');
const router = express.Router();

const RestaurantController = require('../controllers/restaurant-controller');

// basic crud
router.post('/', RestaurantController.create);
router.get('/', RestaurantController.readAll);
router.get('/:id', RestaurantController.readById);
router.put('/:id', RestaurantController.update);
router.delete('/:id', RestaurantController.delete);

// filter
router.post('/filter', RestaurantController.filter);
router.post('/nearby', RestaurantController.readByDishesType);

module.exports = router;
