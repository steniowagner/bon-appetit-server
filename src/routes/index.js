const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).send({
    message: "UHUL! The API is UP && RUNNING!"
  });
});

router.use("/review", require("./review"));
router.use("/dishes", require("./dishes"));
router.use("/restaurants", require("./restaurant"));
router.use("/event", require("./event"));
router.use("/home", require("./home"));

module.exports = router;
