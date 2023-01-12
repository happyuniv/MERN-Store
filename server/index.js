import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./route/user.js";
import authRoute from "./route/auth.js";
import productRoute from "./route/product.js";
import orderRoute from "./route/order.js";
import stripeRoute from "./route/stripe.js";
import cors from "cors";

dotenv.config();

mongoose
  .connect(process.env.MONGO_CONNECT)
  .then(() => console.log("MONGO DB Connected"))
  .catch((e) => console.log(e));

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/order", orderRoute);
app.use("/api/stripe", stripeRoute);

app.listen(process.env.PORT, () => {
  console.log(`backend server running on ${process.env.PORT}`);
});
