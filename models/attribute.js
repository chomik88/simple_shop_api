const mongoose = require("mongoose");

const attributeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  values: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Attribute", attributeSchema);
