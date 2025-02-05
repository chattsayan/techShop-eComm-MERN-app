import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    trim: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error(`Invalid email address: ${value}`);
      }
    },
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error(`Enter a strong password: ${value}`);
      }
    },
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
