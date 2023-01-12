import express from "express";
import Order from "../model/Order.js";
import {
  veryfyTokenAndAdmin,
  veryfyTokenAndAuthorization,
} from "./verifyToken.js";

const router = express.Router();

// CREATE -> stripe
// router.post("/:id", veryfyTokenAndAuthorization, async (req, res) => {
//   const newOrder = new Order(req.body);
//   try {
//     const savedOrder = await newOrder.save();
//     res.status(200).json(savedOrder);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// UPDATE
router.put("/:id", veryfyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/:id", veryfyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ORDER
router.get(
  "/find/:id/:order",
  veryfyTokenAndAuthorization,
  async (req, res) => {
    try {
      const order = await Order.findById(req.params.order);
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// GET USER ORDER
router.get("/user/:id", veryfyTokenAndAuthorization, async (req, res) => {
  try {
    const order = await Order.find({ userId: req.params.id });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL
router.get("/", veryfyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET MONTHLY INCOME
// router.get("/income", veryfyTokenAndAdmin, async (req, res) => {
//   const date = new Date();
//   const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
//   const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

//   try {
//     const income = await Order.aggregate([
//       { $match: { createdAt: { $gte: previousMonth } } },
//       {
//         $project: {
//           month: { $month: "$createdAt" },
//           sales: "$amount",
//         },
//       },
//       {
//         $group: {
//           _id: "$month",
//           total: { $sum: "$sales" },
//         },
//       },
//     ]);
//     res.status(200).json(income);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

export default router;
