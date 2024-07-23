const express = require("express");
const profileController = require("../controller/profile");
const router = express.Router();

router.get("/:id", profileController.handleProfileGet);

module.exports = router;
