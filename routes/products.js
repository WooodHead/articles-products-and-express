
const express = require('express');
const router = express('router');
const products = require('../db/products');
const postIsValid = products.postValidator;
const putIsValid = products.putValidator;
const deleteIsValid = products.deleteValidator;
const storeProduct = products.storeProduct;
const getProductList = products.getProductList;
const productMap = getProductList();

router.get('/', (req, res) => {
  res.render('index', {products: productMap, productMessages: res.locals.messages()});
});

let ID = 0;

router.post('/', (req, res) => {
  let newProduct = req.body;
  if(postIsValid(newProduct)){
    let productObject = {
      id: ID,
      name: newProduct.name,
      price: newProduct.price,
      inventory: newProduct.inventory
    };
    storeProduct(productObject);
    ID++;
    res.redirect('/products');
  } else {
    req.flash("error", "Invalid Post..Create new product!");
    res.redirect('/products/new');
  }
});

router.put('/:id', (req, res) => {
    let newProduct = req.body;
    let newID = req.body.id;
    let addressID = req.params.id;
  if(putIsValid(newProduct, addressID)){
    if(newProduct.hasOwnProperty('name')){
      productMap[newID].name = newProduct.name;
    }
    if(newProduct.hasOwnProperty('price')){
      productMap[newID].price = newProduct.price;
    }
    if(newProduct.hasOwnProperty('inventory')){
      productMap[newID].inventory = newProduct.inventory;
    }
    } else {
      req.flash("error", "Update failed..try again!");
      res.redirect(303, `/products/${newID}/edit`);
    }
    res.redirect(303, `/products/${newID}`);
});

router.delete('/:id', (req, res) => {
  let targetID = req.params.id;
  if(deleteIsValid(targetID)){
    delete productMap[targetID];
  } else {
    req.flash("error", "Delete unsuccessful..");
    res.redirect(303, `/products/${targetID}`);
  }
  req.flash("info", "Delete successful!");
  res.redirect(303, '/products');
});

router.get('/new', (req, res) => {
  res.render('./partials/new_product', {messages: res.locals.messages()});
});

router.get('/:id', (req, res) => {
  let targetID = req.params.id;
  res.render('./partials/product', {products: productMap[targetID], messages: res.locals.messages()});
});

router.get('/:id/edit', (req, res) => {
  targetID = req.params.id;
  res.render('./partials/edit_product', {products:productMap[targetID], messages: res.locals.messages()});
});

module.exports = router;