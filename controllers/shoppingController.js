const Shopping = require("../models/Shopping.js");
const Product = require("../models/Product");
const catchAsync = require("../utils/catchAsync");
exports.shoppingVerify = catchAsync(async (req, res) => {
  const products = await Shopping.find();

  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: products.length,
    message: `Productos displonibles en Catalogo`,
    data: {
      products,
    },
  });
  
});
exports.addShoppingCart = catchAsync(async (req, res) => {
  const newShopping = await Shopping.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      product: newShopping,
    },
  });
});
exports.deleteShoppingCart = catchAsync(async (req, res) => {
    const shopping = await Shopping.findOneAndRemove({ _id: req.params.id })
    res.status(200).json({
      status: "success",
      message: "Se elimino correctamente el siguiente dato",
      data: {
        shopping,
      },
    });
  });
