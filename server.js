//jshint esversion: 6
const express = require('express');
const app = express();
const products = require('./routes/products');

app.use('/products', products);

app.get('/', (req, res) => {
  res.send("home directory");
});

module.exports = app;