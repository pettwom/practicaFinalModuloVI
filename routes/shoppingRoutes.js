const express = require("express");
const shoppingController = require("./../controllers/shoppingController");
const authController = require("./../controllers/authController");
const shoppingRouter = express.Router();
//routes
shoppingRouter
  .route("/")
  .all(authController.protect)
  .get(shoppingController.shoppingVerify)
  .post(shoppingController.addShoppingCart);
  shoppingRouter
  .route("/:id")
  .all(authController.protect)
  .delete(shoppingController.deleteShoppingCart)

module.exports = shoppingRouter;