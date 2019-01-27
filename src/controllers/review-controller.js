const debug = require("debug")("bon-appetit-api:review-controller");
const ReviewDAO = require("../dao/review-dao");

exports.create = async (req, res, next) => {
  try {
    const { id } = await ReviewDAO.create(req.body);

    return res.status(201).send({
      message: "Review Created with Success!",
      id
    });
  } catch (err) {
    debug(err);

    return res.status(500).send({
      message: "Error when trying to Create Review."
    });
  }
};

exports.createInBatch = async (req, res, next) => {
  try {
    await ReviewDAO.createInBatch(req.body);

    return res.status(201).send({
      message: "Reviews Created with Success!"
    });
  } catch (err) {
    debug(err);

    return res.status(500).send({
      message: "Error when trying to Create Reviews in batch."
    });
  }
};

exports.readAll = async (req, res, next) => {
  try {
    const reviews = await ReviewDAO.readAll();

    return res.status(200).send({
      reviews
    });
  } catch (err) {
    debug(err);

    return res.status(500).send({
      message: "Error when trying to Read All Reviews."
    });
  }
};

exports.readById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const review = await ReviewDAO.readById(id);

    if (review) {
      return res.status(200).send({
        review
      });
    }

    return res.status(404).send({
      message: "Review Not Found"
    });
  } catch (err) {
    debug(err);

    return res.status(500).send({
      message: "Error when trying to Read Review."
    });
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;

    const reviewUpdated = await ReviewDAO.update(id, req.body);

    if (reviewUpdated) {
      return res.status(200).send({
        reviewUpdated
      });
    }

    return res.status(404).send({
      message: "Review Not Found"
    });
  } catch (err) {
    debug(err);

    return res.status(500).send({
      message: "Error when trying to Update Review."
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;

    const reviewDeleted = await ReviewDAO.delete(id);

    if (reviewDeleted) {
      return res.status(200).send({
        message: "Dishe Deleted with Success!"
      });
    }

    return res.status(404).send({
      message: "Review Not Found"
    });
  } catch (err) {
    debug(err);

    return res.status(500).send({
      message: "Error when trying to Delete Review."
    });
  }
};
