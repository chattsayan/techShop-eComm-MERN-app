import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productController.js";
import { userAuth, adminAuth } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

const router = express.Router();

router.route("/").get(getProducts).post(userAuth, adminAuth, createProduct);
router.get("/top", getTopProducts);
router
  .route("/:id")
  .get(checkObjectId, getProductById)
  .put(userAuth, adminAuth, checkObjectId, updateProduct)
  .delete(userAuth, adminAuth, checkObjectId, deleteProduct);
router.route("/:id/reviews").post(userAuth, checkObjectId, createProductReview);

export default router;
