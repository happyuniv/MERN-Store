import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
    rating: {
      rate: { type: Number },
      count: { type: Number },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
