const express = require("express");
const signinController = require("../controller/signin");
const router = express.Router();

router.post("/", signinController.handleSignin);

module.exports = router;
