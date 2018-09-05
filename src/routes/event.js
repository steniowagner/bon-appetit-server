const express = require('express');
const router = express.Router();

const EventController = require('../controllers/event-controller');

router.post('/', EventController.create);
router.get('/', EventController.readAll);
router.get('/:id', EventController.readById);
router.put('/:id', EventController.update);
router.delete('/:id', EventController.delete);

module.exports = router;
