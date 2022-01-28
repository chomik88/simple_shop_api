const express = require("express");
const router = express.Router();
const multer = require("multer");
const uuid = require("uuid");
const Product = require("../models/product");
const fs = require("fs");
const _ = require("lodash");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    const fileName = `${uuid.v4()}_${file.originalname.replace(/#/g, "")}`;
    cb(null, fileName);
  },
});
const upload = multer({ storage: storage });

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

router.post("/", upload.array("images"), async (req, res, next) => {
  const files = req.files.map((file) => {
    return {
      fileName: file.filename,
      path: file.path,
    };
  });
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category.split(","),
    thumbnail: req.body.thumbnail,
    images: files,
    mainImage: req.body.mainImage,
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/:id", upload.array("images"), async (req, res) => {
  const updatedProduct = await Product.findById(req.params.id);
  if (req.body.name != null) {
    updatedProduct.name = req.body.name;
  }
  if (req.body.description != null) {
    updatedProduct.description = req.body.description;
  }
  if (req.body.category != null) {
    updatedProduct.category = req.body.category.split(",");
  }
  if (req.body.thumbnail != null) {
    updatedProduct.thumbnail = req.body.thumbnail;
  }
  if (req.body.mainImage != null) {
    updatedProduct.mainImage = req.body.mainImage;
  }
  if (req.body.attributes != null) {
    updatedProduct.attributes = req.body.attributes;
  }
  if (req.body.servedImages != null) {
    const servedImages = JSON.parse(req.body.servedImages);
    const filesToDelete = updatedProduct.images.filter((item) => {
      return _.findIndex(servedImages, item) === -1;
    });
    updatedProduct.images = servedImages;
    filesToDelete.forEach((file) => {
      deleteFile(file.fileName);
    });
  }
  if (req.files && req.files.length > 0) {
    req.files.forEach((file) => {
      if (
        req.body.mainImage &&
        file.filename.includes(req.body.mainImage.replace(/#/g, ""))
      ) {
        updatedProduct.mainImage =
          "http://localhost:3000/uploads/" + file.filename;
      }
    });
    updatedProduct.images = [
      ...updatedProduct.images,
      ...req.files.map((file) => {
        return {
          fileName: file.filename,
          path: file.path,
        };
      }),
    ];
  }
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updatedProduct
    );
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

const deleteFile = (file) => {
  const path = "./uploads/" + file;
  fs.unlink(path, (error) => {
    if (error) {
      console.log(error);
    }
  });
};

module.exports = router;
