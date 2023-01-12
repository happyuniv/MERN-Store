import express from "express";
import Product from "../model/Product.js";
import {
  veryfyTokenAndAdmin,
  veryfyTokenAndAuthorization,
} from "./verifyToken.js";

const router = express.Router();

// CREATE
router.post("/", veryfyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put("/:id", veryfyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProudct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProudct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/:id", veryfyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL PRODUCT
router.get("/", async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET SEARCH PRODUCT
router.get("/search/:keyword", async (req, res) => {
  try {
    const product = await Product.find({
      title: { $regex: req.params.keyword, $options: "i" },
    });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});
export default router;
