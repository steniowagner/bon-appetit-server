const express = require("express");
const router = express.Router();

const DishController = require("../controllers/dish-controller");

router.post("/", DishController.create);
router.get("/", DishController.readAll);
router.post("/batch", DishController.createInBatch);
router.get("/:id", DishController.readById);
router.patch("/:id", DishController.update);
router.delete("/:id", DishController.delete);

module.exports = router;
