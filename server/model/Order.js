import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    userId: { type: String, required: true },
    useremail: { type: String },
    username: { type: String },
    products: [
      {
        title: { type: String },
        price: { type: Number },
        quantity: { type: Number, default: 1 },
        image: { type: String },
      },
    ],
    address: {
      country: { type: String },
      city: { type: String },
      detail: { type: String },
    },
    total_price: { type: Number },
    //  type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
