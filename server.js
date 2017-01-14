
const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const app = express();
const products = require('./routes/products');
const articles = require('./routes/articles');

const hbs = handlebars.create({
  extname: '.hbs',
  defaultLayout: 'app'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/products', products);
app.use('/articles', articles);

// app.get('/', (req, res) => {
//   res.send(displayProducts.productList);
// });

module.exports = app;