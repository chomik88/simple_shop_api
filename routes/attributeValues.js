const express = require("express");
const router = express.Router();
const AttributeValue = require("../models/attributeValue");

router.get("/", async (req, res) => {
  try {
    const attributeValues = await AttributeValue.find();
    res.json(attributeValues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", getAttributeValue, (req, res) => {
  res.json(res.attributeValue);
});

router.get("/a/:id", getFilteredAttributeValues, (req, res) => {
  res.json(res.filteredAttributeValues);
});

router.post("/", async (req, res) => {
  const attributeValue = new AttributeValue({
    attributeId: req.body.attributeId,
    value: req.body.value,
  });
  try {
    const newAttributeValue = await attributeValue.save();
    res.status(201).json(newAttributeValue);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/:id", getAttributeValue, async (req, res) => {
  if (req.body.value != null) {
    res.attributeValue.value = req.body.value;
  }

  try {
    const updatedAttributeValue = await res.attributeValue.save();
    res.json(updatedAttributeValue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", getAttributeValue, async (req, res) => {
  try {
    await res.attributeValue.remove();
    res.json({ message: `Deleted attribute value with id: ${req.params.id}` });
  } catch (error) {
    res.status(500).json({ message: "Cannot find attribute" });
  }
});

async function getAttributeValue(req, res, next) {
  try {
    attributeValue = await AttributeValue.findById(req.params.id);
    if (attributeValue == null) {
      return res.status(404).json({ message: "Cannot find attribute value" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.attributeValue = attributeValue;
  next();
}

async function getFilteredAttributeValues(req, res, next) {
  try {
    filteredAttributeValues = await AttributeValue.find({
      attributeId: req.params.id,
    });
    if (filteredAttributeValues == null) {
      return res.status(404).json({
        message: `Cannot find values of attribute with id: ${req.params.id}`,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  res.filteredAttributeValues = filteredAttributeValues;
  next();
}

module.exports = router;
