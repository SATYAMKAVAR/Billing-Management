import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      requireed: true,
      unique: true,
    },
    email: {
      type: String,
      requireed: true,
      unique: true,
    },
    password: {
      type: String,
      requireed: true,
    },
    avatar: {
      type: String,
      default: "https://logodix.com/logo/1984127.png",
    },
    isActive: { type: Boolean, default: true },
    categories: {
      type: [String],
      default: [
        "Choose a Categories",
        "Shopping",
        "Food & Dining",
        "Personal Care",
        "Education",
        "Travel",
        "Other",
      ],
    },
    bills: [
      {
        description: { type: String, required: true },
        categories: { type: String, required: true },
        date: { type: String, required: true },
        amount: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
