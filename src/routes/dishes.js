const express = require('express');
const router = express.Router();

const DishesController = require('../controllers/dishes-controller');

router.get('/', DishesController.readAll);
router.get('/:id', DishesController.readById);
router.post('/', DishesController.create);
router.put('/:id', DishesController.update);
router.delete('/:id', DishesController.delete);

module.exports = router;
