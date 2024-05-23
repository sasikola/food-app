const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const restaurentSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Restaurent title is required"],
    },
    address: {
      type: Array,
      required: [true, "Restaurent address is required"],
    },
    imageUrl: {
      type: String,
    },
    foods: {
      type: Array,
    },
    timings: {
      type: String,
      required: [true, "Restaurent timings is required"],
    },
    pickup: {
      type: Boolean,
      default: true,
    },
    delivery: {
      type: Boolean,
      default: true,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    logo: {
      type: String,
      default:
        "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    rating: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
      required: true,
    },
    ratingCount: {
      type: String,
    },
    code: {
      type: String,
    },
    coords: {
      id: { type: String },
      latitude: { type: Number },
      latitudeDelta: { type: Number },
      longitude: { type: Number },
      longitudeDelta: { type: Number },
      address: { type: String },
      title: { type: String },
    },
  },
  { timestamps: true }
);

const Restaurent = mongoose.model("Restaurent", restaurentSchema);

module.exports = Restaurent;
