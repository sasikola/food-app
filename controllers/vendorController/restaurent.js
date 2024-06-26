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

// fetch single restaurent by id

const singleRestaurent = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurent = await Restaurent.findById(id);
    if (!restaurent) {
      return res
        .status(404)
        .json({ message: "Restaurent not found!", success: false });
    }
    res
      .status(200)
      .json({ message: "Restaurent fetched successfully!", restaurent });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// delete restaurent

const deleteRestaurent = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurent = await Restaurent.findByIdAndDelete(id);
    if (!restaurent) {
      return res
        .status(404)
        .json({ message: "Restaurent not found!", success: false });
    }
    res
      .status(200)
      .json({ message: "Restaurent deleted successfully!", restaurent });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// update restaurent

const updateRestaurent = async (req, res) => {
  try {
    const { id } = req.params;
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
      coords,
    } = req.body;
    const restaurent = await Restaurent.findByIdAndUpdate(
      id,
      {
        title,
        address,
        imageUrl,
        foods,
        timings,
        pickup,
        delivery,
        isOpen,
        logo,
        coords,
      },
      { new: true }
    );
    if (!restaurent) {
      return res
        .status(404)
        .json({ message: "Restaurent not found!", success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = {
  createRestaurent,
  allRestaurents,
  singleRestaurent,
  deleteRestaurent,
  updateRestaurent
};
