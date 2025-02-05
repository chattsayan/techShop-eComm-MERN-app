import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./Data/user.js";
import products from "./Data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/database.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    console.log("Clearing existing data...".yellow);
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Seeding users...".yellow);
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    console.log("Seeding products...".yellow);
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log("Data Imported!".green.inverse);
    // process.exit();
  } catch (err) {
    console.error(`Error: ${err.message}`.red.inverse);
    // process.exit(1);
  } finally {
    mongoose.connection.close();
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    // process.exit();
  } catch (err) {
    console.error(`Error: ${err.message}`.red.inverse);
    // process.exit(1);
  } finally {
    mongoose.connection.close();
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
