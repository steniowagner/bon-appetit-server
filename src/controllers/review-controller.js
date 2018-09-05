const debug = require('debug')('bon-appetit-api:review-controller');
const mongoose = require('../db');
const ReviewDAO = require('../dao/review-dao');

exports.create = async (req, res, next) => {
  try {
    const {
      name,
      profileImageURL,
      review,
      stars,
    } = req.body;

    const { _id } = await ReviewDAO.create({
      name,
      profileImageURL,
      review,
      stars,
    });

    return res.status(201).send({
      message: 'Review created with Success!',
      id: _id,
    });

  } catch (err) {
    debug(err);

    return res.status(500).send({
      message: 'Error when trying to persist Review.',
    });
  }
};

exports.read = async (req, res, next) => {
  try {
    const reviews = await ReviewDAO.readAll();

    return res.status(200).send({
      reviews,
    });
  } catch (err) {
    debug(err);
  }
};

exports.readById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const review = await ReviewDAO.readById(id);

    return res.status(200).send({
      review,
    });
  } catch (err) {
    debug(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.body;
    
    const reviewUpdated = await ReviewDAO.update(id, { ...req.body });
    
    return res.status(200).send({
      ...reviewUpdated,
    });
  } catch (err) {
    debug(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;

    await ReviewDAO.delete(id);

    return res.status(200).send({
      message: 'Review deleted with success!',
    });
  } catch (err) {
    debug(err);
  }
}