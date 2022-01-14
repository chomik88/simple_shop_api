const mongoose = require("mongoose");

const attributeValueSchema = new mongoose.Schema({
  attributeId: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("AttributeValue", attributeValueSchema);
