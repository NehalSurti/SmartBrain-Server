const express = require("express");
const imageController = require("../controller/image");
const router = express.Router();

router
  .post("/imageurl", imageController.handleApiCall)
  .put("/entriesCount", imageController.handleImage);

module.exports = router;
