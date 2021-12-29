require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to Mongo DB!");
  })
  .catch((error) => console.error("Connection problem:", error));

const port = process.env.PORT || 3000;

app.use(express.json());

const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');

app.use('/products', productsRouter);
app.use("/categories", categoriesRouter);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
