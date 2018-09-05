const express = require('express');
const router = express.Router();

const ReviewController = require('../controllers/review-controller');

router.get('/', ReviewController.read);
router.get('/:id', ReviewController.readById);
router.post('/', ReviewController.create);
router.put('/', ReviewController.update);
router.delete('/:id', ReviewController.delete);

module.exports = router;
