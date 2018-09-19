const express = require('express');
const router = express.Router();

const EventController = require('../controllers/event-controller');

router.post('/', EventController.create);
router.get('/', EventController.readAll);
router.get('/restaurants', EventController.getRestaurants);
router.put('/:id', EventController.update);
router.delete('/:id', EventController.delete);

module.exports = router;
