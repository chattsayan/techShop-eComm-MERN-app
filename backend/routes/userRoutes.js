import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  getUsers,
  getUserProfile,
  getUserByID,
  updateUserProfile,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";
import { userAuth, adminAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(userAuth, adminAuth, getUsers);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(userAuth, getUserProfile)
  .put(userAuth, updateUserProfile);
router
  .route("/:id")
  .delete(userAuth, adminAuth, deleteUser)
  .get(userAuth, adminAuth, getUserByID)
  .put(userAuth, adminAuth, updateUser);

export default router;
