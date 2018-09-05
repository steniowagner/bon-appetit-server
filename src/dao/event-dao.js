const mongoose = require('mongoose');
const EventModel = require('../models/Event');
const Event = mongoose.model('Event');

exports.create = async (data) => {
  try {
    const event = new Event(data);
    return await event.save();
  } catch (err) {
    throw err;
  }
};

exports.readAll = async () => {
  try {
    return await Event.find({}, { '__v': 0 });
  } catch (err) {
    throw err;
  }
};

exports.readById = async (id) => {
  try {
    return await Event.findById(id, { '__v': 0 });
  } catch (err) {
    throw err;
  }
};

exports.update = async (id, data) => {
  try {
    return await Event.findByIdAndUpdate(id, data, { new: true });
  } catch (err) {
    throw err;
  }
};

exports.delete = async (id) => {
  try {
    return await Event.findByIdAndRemove(id);
  } catch (err) {
    throw err;
  }
};
