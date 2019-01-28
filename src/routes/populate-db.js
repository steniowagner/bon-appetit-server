const express = require("express");
const router = express.Router();

const PopulateDBController = require("../controllers/populate-db-controller");

router.post("/", PopulateDBController.populate);

module.exports = router;
