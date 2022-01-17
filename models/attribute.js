const mongoose = require("mongoose");

const attributeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Attribute", attributeSchema);
