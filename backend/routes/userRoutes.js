import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUsers,
  getUserProfile,
  getUserByID,
  updateUserProfile,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").post(registerUser).get(getUsers);
router.post("/login", authUser);
router.post("/logout", logoutUser);
router.route("/profile").get(getUserProfile).put(updateUserProfile);
router.route("/:id").delete(deleteUser).get(getUserByID).put(updateUser);

export default router;
