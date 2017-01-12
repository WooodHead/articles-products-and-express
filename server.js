//jshint esversion: 6
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const products = require('./routes/products');
const displayProducts = require('./db/products');

app.use(bodyParser.urlencoded());
app.use('/products', products);

app.get('/', (req, res) => {
  res.send(displayProducts.productList);
});

module.exports = app;