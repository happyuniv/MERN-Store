// import express from "express";
// import Cart from "../model/Cart.js";
// import {
//   veryfyTokenAndAdmin,
//   veryfyTokenAndAuthorization,
// } from "./verifyToken.js";

// const router = express.Router();

// // CREATE
// router.post("/:id", veryfyTokenAndAuthorization, async (req, res) => {
//   const newCart = new Cart(req.body);
//   try {
//     const savedCart = await newCart.save();
//     res.status(200).json(savedCart);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // UPDATE
// router.put("/:id", veryfyTokenAndAuthorization, async (req, res) => {
//   try {
//     const updatedCart = await Cart.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       { new: true }
//     );
//     res.status(200).json(updatedCart);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // DELETE
// router.delete("/:id", veryfyTokenAndAuthorization, async (req, res) => {
//   try {
//     await Cart.findByIdAndDelete(req.params.id);
//     res.status(200).json("Cart deleted");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // GET USER CART
// router.get("/find/:userId", veryfyTokenAndAuthorization, async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ userId: req.params.userId });
//     res.status(200).json(cart);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // GET ALL
// router.get("/", veryfyTokenAndAdmin, async (req, res) => {
//   try {
//     const carts = await Cart.find();
//     res.status(200).json(carts);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// export default router;
