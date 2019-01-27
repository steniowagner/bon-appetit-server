const express = require("express");
const router = express.Router();

const EventController = require("../controllers/event-controller");

router.post("/batch", EventController.createInBatch);
router.post("/", EventController.create);
router.get("/", EventController.readAll);
router.get("/:id", EventController.readById);
router.patch("/:id", EventController.update);
router.delete("/:id", EventController.delete);

module.exports = router;
