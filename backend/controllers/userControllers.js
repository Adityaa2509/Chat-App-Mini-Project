const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const bcrypt = require("bcrypt")

//@route           GET /api/user?search=
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

//@route           POST /api/user/
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password,confirmpassword
    ,pic } = req.body;

  if (!name || !email || !password ||!confirmpassword) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }
  if (password !== confirmpassword) {
    res.status(400);
    console.log("chala to sahi bhai")
    throw new Error("Password and Confirm Password Do not Match");

  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

module.exports = { allUsers, registerUser, authUser };
