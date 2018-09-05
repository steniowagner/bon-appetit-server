const debug = require('debug')('bon-appetit-api:review-controller');
const mongoose = require('../db');
const ReviewDAO = require('../dao/review-dao');

exports.create = async (req, res, next) => {
  try {
    const { _id } = await ReviewDAO.create({ ...req.body });

    return res.status(201).send({
      message: 'Review Created with Success!',
      id: _id,
    });
  } catch (err) {
    debug(err);

    return res.status(500).send({
      message: 'Error when trying to Create Review.',
    });
  }
};

exports.readAll = async (req, res, next) => {
  try {
    const reviews = await ReviewDAO.readAll();

    return res.status(200).send({
      reviews,
    });
  } catch (err) {
    debug(err);

    return res.status(500).send({
      message: 'Error when trying to Read All Reviews.',
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

    const review = await ReviewDAO.readById(id);

    if (review) {
      return res.status(200).json({
        review,
      });
    }

    return res.status(404).json({
      message: 'Review Not Found',
    });
  } catch (err) {
    debug(err);

    return res.status(500).send({
      message: 'Error when trying to Read Review.',
    });
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

    return res.status(500).send({
      message: 'Error when trying to Update Review.',
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: `The field 'id' mandatory.`,
      });
    }

    const reviewDeleted = await ReviewDAO.delete(id);

    if (reviewDeleted) {
      return res.status(200).json({
        message: 'Dishe Deleted with Success!',
      });
    }

    return res.status(404).json({
      message: 'Review Not Found',
    });
  } catch (err) {
    debug(err);

    return res.status(500).send({
      message: 'Error when trying to Delete Review.',
    });
  }
};
