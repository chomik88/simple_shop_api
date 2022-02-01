const express = require("express");
const router = express.Router();
const Product = require("../models/product");

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", getProduct, (req, res) => {
  res.json(res.product);
});

router.post("/", async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    thumbnail: req.body.thumbnail,
    attributes: req.body.attributes,
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/:id", getProduct, async (req, res) => {
  if (req.body.name != null) {
    res.product.name = req.body.name;
  }
  if (req.body.description != null) {
    res.product.description = req.body.description;
  }
  if (req.body.category != null) {
    res.product.category = req.body.category;
  }
  if (req.body.thumbnail != null) {
    res.product.thumbnail = req.body.thumbnail;
  }
  if (req.body.attributes != null) {
    res.product.attributes = req.body.attributes;
  }

  try {
    const updatedProduct = await res.product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", getProduct, async (req, res) => {
  try {
    await res.product.remove();
    res.json({ message: `Deleted product with id: ${req.params.id}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getProduct(req, res, next) {
  let product = null;
  try {
    product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: "Cannot find product" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.product = product;
  next();
}

module.exports = router;
