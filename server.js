//jshint esversion: 6
const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const app = express();
const products = require('./routes/products');
const displayProducts = require('./db/products');

const hbs = handlebars.create({
  extname: '.hbs',
  defaultLayout: 'app'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded());
app.use('/products', products);

app.get('/', (req, res) => {
  res.send(displayProducts.productList);
});

module.exports = app;