const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: Array,
    required: true,
  },
  thumbnail: String,
  attributes: {
    type: Array,
    attributeId: {
      type: String,
      required: true,
    },
    attributeValues: {
      type: Array,
      required: true,
    },
  },
  images: {
    type: Array,
    src: String,
  },
  mainImage: String,
});

module.exports = mongoose.model("Product", productSchema);
