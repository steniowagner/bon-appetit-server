const express = require('express');
const router = express.Router();

const ReviewController = require('../controllers/review-controller');

router.post('/', ReviewController.create);
router.get('/', ReviewController.readAll);
router.get('/:id', ReviewController.readById);
router.put('/', ReviewController.update);
router.delete('/:id', ReviewController.delete);

module.exports = router;
