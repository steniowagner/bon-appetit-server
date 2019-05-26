const express = require("express");
const router = express.Router();

const RestaurantController = require("../controllers/restaurant-controller");

router.get("/nearby", RestaurantController.getNearbyRestaurants);
router.post("/batch", RestaurantController.createInBatch);
router.get("/filter", RestaurantController.filter);
router.get("/", RestaurantController.readAll);
router.post("/", RestaurantController.create);
router.delete("/:id", RestaurantController.delete);
router.get("/:id", RestaurantController.readById);
router.patch("/:id", RestaurantController.update);

module.exports = router;
