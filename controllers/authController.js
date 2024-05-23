const bcrypt = require("bcrypt");
const { generateToken } = require("../middleware/authMiddleware");
const User = require("../models/User");

const userRegister = async (req, res) => {
    try {
      const { name, email, password, phone, address } = req.body;
      if (!name || !email || !password || !phone || !address) {
        return res.json({
          message: "Please fill all the fields",
          success: false,
        });
      }
      let existingUser = await User.findOne({
        phone: phone,
      });
      if (existingUser) {
        res.json({ error: "User exists with this Phone Number" });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const user = new User({
        name,
        email,
        password: hashedPassword,
        phone,
        address,
      });
      const response = await user.save();
      const payload = {
        _id: response.id,
      };
      const token = generateToken(payload);
      res.json({
        message: "User registered successfully!",
        response: response,
        token: token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
const userLogin =  async (req, res) => {
    try {
      const { phone, password } = req.body;
      if (!password || !phone) {
        return res.json({
          message: "Please fill all the fields",
          success: false,
        });
      }
      const user = await User.findOne({ phone: phone });
      if (!user) {
        return res
          .status(400)
          .json({ error: "User not found with this Phone number!" });
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(400).json({ message: "Incorrect password!" });
      }
  
      // to generate token
      const payload = {
        _id: user.id,
      };
      const token = generateToken(payload);
      // password = undefined;
      res.status(200).json({
        message: "Logged in successfully!",
        token: token,
        userDetails: user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error", error });
    }
  }
  module.exports = {userRegister, userLogin}