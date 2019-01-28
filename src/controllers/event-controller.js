const mongoose = require("../db");

const RestaurantDAO = require("../dao/restaurant-dao");
const EventDAO = require("../dao/event-dao");

exports.create = async (req, res, next) => {
  try {
    const { id } = await EventDAO.create(req.body);

    return res.status(201).json({
      id
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
};

exports.createInBatch = async (req, res, next) => {
  try {
    await EventDAO.createInBatch(req.body);

    return res.status(201).json({
      message: "Events created with Success!"
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
};

exports.readAll = async (req, res, next) => {
  try {
    const events = await EventDAO.readAll();

    return res.status(200).json({
      events
    });
  } catch (error) {
    return res.status(500).json({
      error
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
  } catch (error) {
    return res.status(500).json({
      error
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
        eventUpdated
      });
    }

    return res.status(404).json({
      message: "Event Not Found"
    });
  } catch (err) {
    return res.status(500).json({
      error
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
      return res.status(200);
    }

    return res.status(404).json({
      message: "Event Not Found"
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
};
