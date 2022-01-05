const express = require("express");
const router = express.Router();
const Order = require("../models/order");

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/c/:id", getCustomerOrders, (req, res) => {
  res.json(res.orders);
});

router.get("/:id", getOrder, (req, res) => {
  res.json(res.order);
});

router.post("/", async (req, res) => {
  const order = new Order({
    orderDate: req.body.orderDate,
    customerId: req.body.customerId,
    orderItems: req.body.orderItems,
  });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/:id", getOrder, async (req, res) => {
  if (req.body.orderDate != null) {
    res.order.orderDate = req.body.orderDate;
  }
  if (req.body.customerId != null) {
    res.order.customerId = req.body.customerId;
  }
  if (req.body.orderItems != null) {
    res.order.orderItems = req.body.orderItems;
  }

  try {
    const updatedOrder = await res.order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", getOrder, async (req, res) => {
  try {
    await res.order.remove();
    res.json({ message: `Deleted order with id: ${req.params.id}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getOrder(req, res, next) {
  try {
    order = await Order.findById(req.params.id);
    if (order == null) {
      return res.status(404).json({ message: "Cannot find order" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  res.order = order;
  next();
}

async function getCustomerOrders(req, res, next) {
  try {
    orders = await Order.find({ customerId: req.params.id });
    if (orders == null) {
      return res.status(404).json({ message: "Cannot find orders" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.orders = orders;
  next();
}

module.exports = router;
