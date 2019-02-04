const debug = require("debug")("bon-appetit-api:event-controller");
const mongoose = require("../db");

const shuffleArray = require("../utils/shuffle-array");
const RestaurantDAO = require("../dao/restaurant-dao");
const EventDAO = require("../dao/event-dao");

exports.create = async (req, res, next) => {
  try {
    const { id } = await EventDAO.create(req.body);

    return res.status(201).json({
      message: "Event created with Success!",
      id
    });
  } catch (err) {
    debug(err);

    return res.status(500).json({
      message: "Error when trying to Create Event."
    });
  }
};

exports.createInBatch = async (req, res, next) => {
  try {
    await EventDAO.createInBatch(req.body);

    return res.status(201).json({
      message: "Events created with Success!"
    });
  } catch (err) {
    debug(err);

    return res.status(500).json({
      message: "Error when trying to Create Events."
    });
  }
};

exports.readAll = async (req, res, next) => {
  try {
    const allEvents = await EventDAO.readAll();
    const events = shuffleArray(allEvents);

    return res.status(200).json({
      events
    });
  } catch (err) {
    debug(err);

    return res.status(500).json({
      message: "Error when trying to Read All Events"
    });
  }
};

exports.readById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "The field id is required."
      });
    }

    const event = await EventDAO.readById(id);

    if (!event) {
      return res.status(404).json({
        message: "Event Not Found"
      });
    }

    const restaurantsFilteredByDishType = await RestaurantDAO.filterBasedDishesTypes(
      event.dishesTypes
    );

    const restaurants = restaurantsFilteredByDishType
      .map(data => ({
        ...data.restaurants[0],
        id: data.restaurants[0]._id
      }))
      .slice(0, event.restaurantsParticipating);

    return res.status(200).json({
      restaurants,
      event
    });
  } catch (err) {
    debug(err);

    return res.status(500).json({
      message: "Error when trying to Read Event"
    });
  }
};

exports.update = async (req, res, nex) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "The field id is required."
      });
    }

    const eventUpdated = await EventDAO.update(id, { ...req.body });

    if (eventUpdated) {
      return res.status(200).json({
        message: "Event updated with Success!",
        eventUpdated
      });
    }

    return res.status(404).json({
      message: "Event Not Found"
    });
  } catch (err) {
    debug(err);

    return res.status(500).json({
      message: "Error when trying to Update Event"
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "The field id is required."
      });
    }

    const eventDeleted = await EventDAO.delete(id);

    if (eventDeleted) {
      return res.status(200).json({
        message: "Event deleted with Success!"
      });
    }

    return res.status(404).json({
      message: "Event Not Found"
    });
  } catch (err) {
    debug(err);

    return res.status(500).json({
      message: "Error when trying to Delete Event"
    });
  }
};
