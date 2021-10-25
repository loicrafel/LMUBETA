const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6,
    },
    likes: {
      type: [String],
    },
    contributions: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

// play function before save into display: 'block',

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
