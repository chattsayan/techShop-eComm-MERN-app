import express from "express";
import cors from "cors";
import connectDB from "./config/database.js";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

app.use("/api/products", productRoutes); // Middleware to parse JSON bodies
app.use("/api/users", userRoutes); // To parse URL-encoded data

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
