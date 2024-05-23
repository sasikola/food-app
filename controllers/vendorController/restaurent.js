const Restaurent = require("../../models/Restaurent");

const createRestaurent = async (req, res) => {
  try {
    const {
      title,
      address,
      imageUrl,
      foods,
      timings,
      pickup,
      delivery,
      isOpen,
      logo,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;

    if (!title || !address) {
      return res.json({
        message: "Please provide the title and address of the restaurent!",
        success: false,
      });
    }
    // check if the restaurent is exists or not
    const existingRestaurent = await Restaurent.findOne({ title });
    if (existingRestaurent) {
      return res
        .status(400)
        .json({ message: "Restaurent already exists!", success: false });
    }
    const restaurent = new Restaurent({
      title,
      address,
      imageUrl,
      foods,
      timings,
      pickup,
      delivery,
      isOpen,
      logo,
      rating,
      ratingCount,
      code,
      coords,
    });
    const response = await restaurent.save();
    res
      .status(200)
      .json({ message: "Restaurent created successfully!", response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// fetch all restaurents
const allRestaurents = async (req, res) => {
  try {
    const restaurents = await Restaurent.find();
    res
      .status(200)
      .json({ message: "Restaurents fetched successfully!", restaurents });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = { createRestaurent, allRestaurents };
