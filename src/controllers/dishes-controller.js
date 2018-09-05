const debug = require('debug')('bon-appetit-api:dishes-controller');
const mongoose = require('../db');
const DishesDAO = require('../dao/dishes-dao');

exports.create = async (req, res, next) => {
  try {
    const { _id } = await DishesDAO.create({ ...req.body });

    return res.status(201).json({
      message: 'Dishe created with Success!',
      id: _id,
    });
  } catch (err) {
    debug(err);

    return res.status(500).send({
      message: 'Error when trying to persist Dishes.',
    });
  }
};

exports.readAll = async (req, res, next) => {
  try {
    const dishes = await DishesDAO.readAll();
    
    return res.status(200).json({
      dishes,
    });
  } catch (err) {
    debug(err);

    return res.status(500).send({
      message: 'Error when trying to read Dishes.',
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

    const dishe = await DishesDAO.readById(id);

    if (dishe) {
      return res.status(200).json({
        dishe,
      });
    }

    return res.status(404).json({
      message: 'Dishe Not Found',
    });
  } catch (err) {
    debug(err);

    return res.status(500).json({
      message: 'Error when trying to read Dishe.',
    });
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;

    const disheUpdated = await DishesDAO.update(id, { ...req.body });

    return res.status(200).json({
      disheUpdated,
    });
  } catch (err) {
    debug (err);

    return res.status(500).json({
      message: 'Error when trying to update Dishe.',
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: `The field 'id' is mandatory`,
      });
    }

    const disheDeleted = await DishesDAO.delete(id);

    if (disheDeleted) {
      return res.status(200).json({
        message: 'Dishe deleted with Success!',
      });
    }

    return res.status(404).json({
      message: 'Dishe Not Found',
    });
  } catch (err) {
    debug(err);

    return res.status(500).json({
      message: 'Error when trying to delete Dishe.',
    });
  }
};
