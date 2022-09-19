const crypto = require("crypto");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");

exports.addUser = catchAsync(async (req, res) => {
  req.body.password = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("hex");

  let newUser = await User.create(req.body);
  newUser = newUser.toObject();
  delete newUser.password;

  res.status(200).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUserById = catchAsync(async (req, res) => {
  const foundUsers = await User.findById(req.params.id);
  if (foundUsers) {
    res.status(200).json({
      status: "success",
      data: {
        user: foundUsers,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
});

exports.deleteUserById = catchAsync(async (req, res) => {
  const users = await User.findOneAndRemove({ _id: req.params.id })
  res.status(200).json({
    status: "success",
    message: "Se elimino correctamente el siguiente dato",
    data: {
      users,
    },
  });
})
exports.updateUsertById = catchAsync(async (req, res) => {
  req.body.password = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("hex");
  const users = await User.findOneAndUpdate({ _id: req.params.id }, {userName: req.body.userName, password:req.body.password, email:req.body.email})
  res.status(200).json({
    status: "success",
    message: `Se Modifico correctamente el ${req.params.id}`,
    data: {
      users,
    },
  });
})