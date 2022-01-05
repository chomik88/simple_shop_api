const express = require("express");
const router = express.Router();
const Customer = require("../models/customer.js");

router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", getCustomer, (req, res) => {
  res.json(res.customer);
});

router.post("/", async (req, res) => {
  const customer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    dateOfBirth: req.body.dateOfBirth,
    address: {
      street: req.body.address.street,
      flatNumber: req.body.address.flatNumber,
      zipCode: req.body.address.zipCode,
      city: req.body.address.city,
      country: req.body.address.country,
    },
  });

  try {
    const newCustomer = await customer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/:id", getCustomer, async (req, res) => {
  if (req.body.firstName != null) {
    res.customer.firstName = req.body.firstName;
  }
  if (req.body.lastName != null) {
    res.customer.lastName = req.body.lastName;
  }
  if (req.body.email != null) {
    res.customer.email = req.body.email;
  }
  if (req.body.dateOfBirth != null) {
    res.customer.dateOfBirth = req.body.dateOfBirth;
  }
  if (req.body.address.street != null) {
    res.customer.address.street = req.body.address.street;
  }
  if (req.body.address.flatNumber != null) {
    res.customer.address.flatNumber = req.body.address.flatNumber;
  }
  if (req.body.address.zipCode != null) {
    res.customer.address.zipCode = req.body.address.zipCode;
  }
  if (req.body.address.city != null) {
    res.customer.address.city = req.body.address.city;
  }
  if (req.body.address.country != null) {
    res.customer.address.country = req.body.address.country;
  }

  try {
    const updatedCustomer = await res.customer.save();
    res.json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", getCustomer, async (req, res) => {
  try {
    await res.customer.remove();
    res.json({ message: `Deleted customer with id: ${req.params.id}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getCustomer(req, res, next) {
  try {
    customer = await Customer.findById(req.params.id);
    if (customer == null) {
      return res.status(404).json({ message: "Cannot find customer" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.customer = customer;
  next();
}

module.exports = router;
