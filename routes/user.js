const express = require("express");
const userController = require("../controller/user");
const router = express.Router();

router
  .get("/:id", userController.getUser)
  .post("/createUser", userController.createUser)
  .put("/updateUser/:id", userController.updateUser)
  .delete("/:id", userController.deleteUser);

module.exports = router;
