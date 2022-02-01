require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

app.use(cors());
app.use(morgan('dev'));
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to Mongo DB!");
  })
  .catch((error) => console.error("Connection problem:", error));

const port = process.env.PORT || 3000;

app.use(express.json());

const productsRouter = require("./routes/products");
const categoriesRouter = require("./routes/categories");
const customersRouter = require("./routes/customers");
const ordersRouter = require("./routes/orders");
const attributesRouter = require("./routes/attributes");
const attributeValuesRouter = require("./routes/attributeValues");

app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);
app.use("/customers", customersRouter);
app.use("/orders", ordersRouter);
app.use("/attributes", attributesRouter);
app.use("/attributes", attributeValuesRouter);
app.use("/attribute-values", attributeValuesRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
