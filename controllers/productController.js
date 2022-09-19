const fs = require("fs");
const Product = require("../models/Product");
const catchAsync = require("../utils/catchAsync");

exports.getAllProducts = catchAsync(async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: products.length,
    data: {
      products,
    },
  });
});

exports.addProduct = catchAsync(async (req, res) => {
  console.log(123);
  const newProduct = await Product.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      product: newProduct,
    },
  });
});

exports.getProductById = catchAsync(async (req, res) => {
  const foundProduct = await Product.findById(req.params.id);
  if (foundProduct) {
    res.status(200).json({
      status: "success",
      data: {
        product: foundProduct,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
});
exports.deleteProductById = catchAsync(async (req, res) => {
  const products = await Product.findOneAndRemove({ _id: req.params.id })
  res.status(200).json({
    status: "success",
    message: "Se elimino correctamente el siguiente dato",
    data: {
      products,
    },
  });
})
exports.updateProductById = catchAsync(async (req, res) => {
  const products = await Product.findOneAndUpdate({ _id: req.params.id }, {productName: req.body.productName, price:req.body.price, description:req.body.description})
  res.status(200).json({
    status: "success",
    message: `Se Modifico correctamente el ${req.params.id}`,
    data: {
      products,
    },
  });
})