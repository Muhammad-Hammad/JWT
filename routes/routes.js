const express = require("express");
const router = express.Router();
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    console.log("main chala");
    const { first_name, last_name, email, password } = await req.body;
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).send({
        // bad request
        message: "All fields are required",
      });
    }
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send({
        // conflict
        message: "Email already Exist",
      });
    }
    let encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      { expiresIn: "4h" }
    );
    user.token = token;
    res.status(201).send({
      // created
      message: "user has been created",
      data: user,
    });
  } catch (err) {
    console.log("error : ", err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send({
        message: "All inputs are required",
      });
    }
    const user = await User.findOne({ email });
    if (user && bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "4h",
        }
      );
      user.token = token;
      res.status(200).send({
        //okay
        message: "user is successfully login",
      });
    }
    res.status(400).send({
      // bad request
      message: "Invalid Credentials",
    });
  } catch (err) {
    console.log("error", err);
  }
});

module.exports = router;
