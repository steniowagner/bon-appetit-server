const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  return res.status(201).send({
    message: 'UHUL! The API is UP && RUNNING!',
  });
});

router.use('/review', require('./review'));

module.exports = router;
