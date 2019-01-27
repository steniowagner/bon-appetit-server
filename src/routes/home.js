const express = require("express");
const router = express.Router();

const HomeController = require("../controllers/home-controller");

router.get("/", HomeController.getHomeData);

module.exports = router;
