const Food = require("../../models/Food");

const createFood = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      imageUrl,
      restaurent,
      vendor,
      rating,
      reviews,
    } = req.body;

    // validation
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !restaurent ||
      !vendor
    ) {
      return res.json({
        message: "Please fill all the fields",
        success: false,
      });
    }
    const food = new Food({
      name,
      description,
      price,
      category,
      imageUrl,
      restaurent,
      vendor,
      rating,
      reviews,
    });
    await food.save();
    res.json({
      message: "Food created successfully",
      success: true,
      food: food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// to get all foods
const allFoods = async (req, res) => {
  try {
    const foods = await Food.find()
      .populate({
        path: "reviews",
        populate: {
          path: "user",
          select: "email",
        },
      })
      .exec();

    if (!foods) {
      return res
        .status(404)
        .json({ message: "Foods not found!", success: false });
    }

    res.json({
      message: "Foods fetched successfully",
      success: true,
      foods: foods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// to update food
const updateFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res
        .status(404)
        .json({ message: "Food not found!", success: false });
    }
    const { name, description, price, category, imageUrl, restaurent, vendor } =
      req.body;
    food.name = name;
    food.description = description;
    food.price = price;
    food.category = category;
    food.imageUrl = imageUrl;
    food.restaurent = restaurent;
    food.vendor = vendor;

    const response = await food.save();
    res.status(200).json({ message: "Food updated successfully!", response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// to delete food

const deleteFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    if (!food) {
      return res
        .status(404)
        .json({ message: "Food not found!", success: false });
    }
    res.status(200).json({ message: "Food deleted successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = { createFood, allFoods, updateFood, deleteFood };
