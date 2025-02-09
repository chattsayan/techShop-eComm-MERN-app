import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

const userAuth = asyncHandler(async (req, res, next) => {
  try {
    // ----- READING COOKIE -----
    let token;
    token = req.cookies?.jwt;

    if (token) {
      // ----- VALIDATING TOKEN -----
      const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

      // ----- FETCHING USER -----
      req.user = await User.findById(decode.userId).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } else {
      return res.status(401).json({ message: "Not Authorized, Token Missing" });
    }
  } catch (err) {
    return res
      .status(401)
      .json({ message: `Authentication Error: ${err.message}` });
  }
});

// Admin Middleware
const adminAuth = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(403).json({ message: "Not authorized as Admin" });
  }
};

export { userAuth, adminAuth };
