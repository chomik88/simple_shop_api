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
  thumbnail: {
    type: String,
  },
});

module.exports = mongoose.model("Product", productSchema);
