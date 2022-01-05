const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: String,
  dateOfBirth: {
    type: Date,
    required: true,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    flatNumber: String,
    zipCode: String,
    city: String,
    country: String,
  },
});

module.exports = mongoose.model("Customer", customerSchema);
