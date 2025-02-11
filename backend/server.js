import express from "express";
import cors from "cors";
import connectDB from "./config/database.js";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// cookie-parser Middleware
app.use(cookieParser()); // allows to parse cookie from request object

// Body Parser Middleware
app.use("/api/products", productRoutes); // Middleware to parse JSON bodies
app.use("/api/users", userRoutes); // To parse URL-encoded data
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

app.use(notFound);
app.use(errorHandler);

connectDB()
  .then(() => {
    console.log("DB Connection Established...");

    app.listen(port, () => {
      console.log(`server is successfully listening on port ${port}`);
    });
  })
  .catch((err) => console.error(`DB Connection Failed- ${err}`));
