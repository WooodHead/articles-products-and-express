
const express = require('express');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const handlebars = require('express-handlebars');
const app = express();
const serverHelper = require('./db/server');
const products = require('./routes/products');
const articles = require('./routes/articles');
const methodOverride = require('method-override');
const fs = require('fs');

const setHeaderVersion = serverHelper.setHeaderVersion;
const checkHeaderVersion = serverHelper.checkHeaderVersion;

let week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const hbs = handlebars.create({
  extname: '.hbs',
  defaultLayout: 'app'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
app.use((req, res, next) => {
  setHeaderVersion(req);
  next();
});
app.use('/articles', (req, res, next) => {
  let header = req.headers;
  if(checkHeaderVersion(header)){
    next();
  } else {
    res.json({"error": "bad headers"});
  }
});
app.use((req, res, next) => {
  let date = new Date();
  let index = date.getDay();
  let currentDay = week[index];
  fs.writeFile(`./logs/${currentDay}/${date}.log`, `[${req.method}] [${req.url}] [${date}]`, (err) => {
    if (err) throw err;
    console.log(`new log ${date}`);
  });
  next();
});
app.use(methodOverride('_method'));
app.use('/products', products);
app.use('/articles', articles);

module.exports = app;