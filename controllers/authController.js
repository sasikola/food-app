const bcrypt = require("bcrypt");
const { generateToken } = require("../middleware/authMiddleware");
const User = require("../models/User");

// User Register
const userRegister = async (req, res) => {
  try {
    const { name, email, password, phone, address, userType } = req.body;
    if (!name || !email || !password || !phone || !address) {
      return res.json({
        message: "Please fill all the fields",
        success: false,
      });
    }

    let existingUser = await User.findOne({ phone: phone });
    if (existingUser) {
      return res.json({ message: "User exists with this Phone Number" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      userType: "user",
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
};

// Vendor Register
const vendorRegister = async (req, res) => {
  try {
    const { name, email, password, phone, address, userType } = req.body;
    if (!name || !email || !password || !phone || !address) {
      return res.json({
        message: "Please fill all the fields",
        success: false,
      });
    }

    let existingUser = await User.findOne({ phone: phone });
    if (existingUser) {
      return res.json({ message: "User exists with this Phone Number" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      userType: "vendor",
    });
    const response = await user.save();
    const payload = {
      _id: response.id,
    };
    const token = generateToken(payload);
    res.json({
      message: "Vendor registered successfully!",
      response: response,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// user login
const userLogin = async (req, res) => {
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
      message: "Vendor Logged in successfully!",
      token: token,
      userDetails: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error", error });
  }
};

// vendor Login
const vendorLogin = async (req, res) => {
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
        .json({ error: "Vendor not found with this Phone number!" });
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
      message: "Vendor Logged in successfully!",
      token: token,
      userDetails: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error", error });
  }
};

// admin login
const adminLogin = async (req, res) => {
  const { phone, password } = req.body;

  try {
    const user = await User.findOne({ $or: [{ email }, { phone }] });
    if (!user || user.userType !== "admin")
      return res.status(400).json({ message: "Admin not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: "Invalid password" });

    // to generate token
    const payload = {
      _id: user.id,
    };
    const token = generateToken(payload);
    res.header("Authorization", `Bearer ${token}`).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = {
  userRegister,
  userLogin,
  vendorRegister,
  vendorLogin,
  adminLogin,
};
