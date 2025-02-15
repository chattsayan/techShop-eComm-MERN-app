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

const router = express.Router();

router.route("/").get(getProducts).post(userAuth, adminAuth, createProduct);
router.get("/top", getTopProducts);
router
  .route("/:id")
  .get(getProductById)
  .put(userAuth, adminAuth, updateProduct)
  .delete(userAuth, adminAuth, deleteProduct);
router.route("/:id/reviews").post(userAuth, createProductReview);

export default router;
