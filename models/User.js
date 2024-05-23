const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    address: {
      type: Array,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },
    userType: {
      type: String,
      required: [true, "User type is required"],
      default: "user",
      enum: ["user", "admin", "vendor"],
    },
    profile: {
      type: String,
      default:
        "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
