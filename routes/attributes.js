const express = require("express");
const router = express.Router();
const Attribute = require("../models/attribute");

router.get("/", async (req, res) => {
  try {
    const attributes = await Attribute.find();
    res.json(attributes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", getAttribute, (req, res) => {
  res.json(res.attribute);
});

router.post("/", checkIfAttributeExists, async (req, res) => {
  const attribute = new Attribute({
    name: req.body.name,
    attributeValues: req.body.values,
  });
  try {
    if (res.attribute.length > 0) {
      res.status(409).json({ message: "Attribute already exists" });
    } else {
      const newAttribute = await attribute.save();
      res.status(201).json(newAttribute);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/:id", getAttribute, async (req, res) => {
  if (req.body.name != null) {
    res.attribute.name = req.body.name;
  }

  if (req.body.values != null) {
    res.attribute.attributeValues = req.body.values;
  }

  try {
    const updatedAttribute = await res.attribute.save();
    res.json(updatedAttribute);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", getAttribute, async (req, res) => {
  try {
    await res.attribute.remove();
    res.json({ message: `Deleted attribute with id: ${req.params.id}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getAttribute(req, res, next) {
  let attribute = null;
  try {
    attribute = await Attribute.findById(req.params.id);
    if (attribute == null) {
      return res.status(404).json({ message: "Cannot find attribute" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.attribute = attribute;
  next();
}

async function checkIfAttributeExists(req, res, next) {
  let attribute = null;
  try {
    attribute = await Attribute.find({ name: req.body.name });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
  res.attribute = attribute;
  next();
}

module.exports = router;
