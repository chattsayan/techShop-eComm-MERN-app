import express from "express";
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
} from "../controllers/orderController.js";
import { userAuth, adminAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(userAuth, addOrderItems)
  .get(userAuth, adminAuth, getOrders);
router.route("/myorders").get(userAuth, getMyOrders);
router.route("/:id").get(userAuth, getOrderById);
router.route("/:id/pay").put(userAuth, updateOrderToPaid);
router.route("/:id/deliver").put(userAuth, adminAuth, updateOrderToDelivered);

export default router;
