const User = require("../../models/User");

const allVendors = async (req, res) => {
  try {
    const vendors = await User.find({ userType: "vendor" }).select("-password");

    res.json({ message: "Vendors fetched successfully!", vendors });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};

module.exports = { allVendors };
