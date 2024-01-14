const express = require("express");
const bcrypt = require("bcrypt");
const {generateToken}=require("../config/token")
const UserModel = require("../models/user.model");
const authorize=require("../middlewares/role.middleware")

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  res.send("users route");
});

userRouter.post("/register", async (req, res) => {
  const { name, email, password, mobile ,role} = req.body;
  if (!name || !email || !password||!mobile) {
    res.status(400).json({ msg: "please fill all the fields" });
  }
  try {
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      res.status(201).json({ msg: "user already exist" });
    } else {
      bcrypt.hash(password, 2, async (err, hash) => {
        // Store hash in your password DB.
        if (err) {
          res.status(400).json({ error: err.message });
        } else {
          const newUser = new UserModel({ name, email, password: hash, mobile,role });
          await newUser.save();
          console.log(newUser);
          res.status(200).json({
            msg: "new user has been added",
            newUser,
            token: generateToken(newUser._id,newUser.role),
          });
        }
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ msg: "please fill Your credentials" });
  }
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        // result == true
        if (result) {
          res.status(200).json({
            msg: "Login Successfull",
            user,
            token: generateToken(user._id,user.role),
          });
        } else {
          res.status(201).json({ msg: "please check your password" });
        }
      });
    } else {
      res.status(201).json({ msg: "please register first" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  } 
});

userRouter.post("/admin/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ msg: "please fill Your credentials" });
  }
  try {
    const user = await UserModel.findOne({ email });
    if (user&&user.role=="admin") {
      bcrypt.compare(password, user.password, function (err, result) {
        // result == true
        if (result) {
          res.status(200).json({
            msg: "Login Successfull",
            user,
            token: generateToken(user._id,user.role),
          });
        } else {
          res.status(201).json({ msg: "please check your password" });
        }
      });
    } else {
      res.status(201).json({ msg: "Not An Admin !! Not authorized" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = userRouter;
