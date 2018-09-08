const debug = require('debug')('bon-appetit-api:event-controller');
const mongoose = require('../db');
const EventDAO = require('../dao/event-dao');

exports.create = async (req, res, next) => {
  try {
    await EventDAO.create(req.body);

    return res.status(201).json({
      message: 'Event created with Success!',
    });
  } catch (err) {
    debug(err);

    return res.status(500).json({
      message: 'Error when trying to Create Event',
    });
  }
};

exports.readAll = async (req, res, next) => {
  try {
    const events = await EventDAO.readAll();

    return res.status(200).json({
      events,
    });
  } catch (err) {
    debug(err);

    return res.status(500).json({
      message: 'Error when trying to Read All Restaurants',
    });
  }
};

exports.readById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: `The field 'id' mandatory`,
      });
    }

    const event = await EventDAO.readById(id);

    if (event) {
      return res.status(200).json({
        event,
      });
    }

    return res.status(404).json({
      message: 'Event Not Found',
    });
  } catch (err) {
    debug(err);

    return res.status(500).json({
      message: 'Error when trying to Read Restaurants',
    });
  }
};

exports.update = async (req, res, nex) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: `The field 'id' mandatory`,
      });
    }

    const eventUpdated = await EventDAO.update(id, { ...req.body });

    if (eventUpdated) {
      return res.status(200).json({
        message: 'Event updated with Success!',
        eventUpdated,
      });
    }

    return res.status(404).json({
      message: 'Event Not Found',
    });
  } catch (err) {
    debug(err);

    return res.status(500).json({
      message: 'Error when trying to Update Event',
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: `The field 'id' mandatory`,
      });
    }

    const eventDeleted = await EventDAO.delete(id);

    if (eventDeleted) {
      return res.status(200).json({
        message: 'Event deleted with Success!',
      });
    }
    
    return res.status(404).json({
      message: 'Event Not Found',
    });
  } catch (err) {
    debug(err);

    return res.status(500).json({
      message: 'Error when trying to Delete Event',
    });
  }
};
