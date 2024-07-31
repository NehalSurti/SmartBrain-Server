const express = require("express");
const tokenVerifyController = require("../controller/tokenVerify");
const { verifyTokenAndAuthorization } = require("../middleware/verifyToken");
const router = express.Router();

router.get("/", verifyTokenAndAuthorization, tokenVerifyController.tokenVerify);

module.exports = router;
