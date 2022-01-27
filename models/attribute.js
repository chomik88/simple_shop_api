const mongoose = require("mongoose");

const attributeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  attributeValues: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Attribute", attributeSchema);
