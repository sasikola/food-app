const User = require("../models/User");
const bcrypt = require("bcrypt");

const allUsers = async (req, res) => {
  try {
    const users = await User.find({ userType: 'user' }).select("-password");

    res.json({ message: "Users fetched successfully!", users });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};

const profile = async (req, res) => {
  try {
    const userData = req.user;

    const userId = userData._id;
    const user = await User.findById(userId);
    res
      .status(200)
      .json({ message: "User profile fetched successfully!", user: user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user; //extract the id from the token
    const { name, phone, email, address } = req.body;

    // find the user by User id
    const user = await User.findById(userId).select("-password");
    // update the user data
    user.name = name;
    user.phone = phone;
    user.email = email;
    user.address = address;
    await user.save();
    res
      .status(200)
      .json({ message: "User profile updated successfully!", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const updatePassword = async (req, res) => {
  try {
    const userId = req.user; //extract the id from the token
    const { currentPassword, newPassword } = req.body; //extract the both passwords from the body

    // find the user by User id
    const user = await User.findById(userId);

    // validation
    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Please provide both passwords!" });
    }

    // check if the current password is correct
    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Incorrect Old password!" });
    }
    // hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    // update the password
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// password reset

const resetPassword = async (req, res) => {
  try {
    const userId = req.user; //extract the id from the token
    const { phone, newPassword, confirmPassword } = req.body; //extract the both passwords from the body

    // find the user by User id
    const user = await User.findOne({ phone });
    // validation
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found with this number!" });
    }

    // validation 
    if (!newPassword) {
      return res.status(400).json({ message: "Please provide New Password!" });
    }
    if (!confirmPassword) {
      return res
        .status(400)
        .json({ message: "Please provide Confirm Password!" });
    }
    if (!phone) {
      return res.status(400).json({ message: "Please provide Phone Number!" });
    }

    // hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    // update the password
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password reset successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = {
  allUsers,
  profile,
  updatePassword,
  updateProfile,
  resetPassword,
};
