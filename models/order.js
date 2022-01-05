const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderDate: {
    type: Date,
    required: true,
  },
  customerId: {
    type: String,
    required: true,
  },
  orderItems: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
