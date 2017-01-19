
const express = require('express');
const router = express('router');
const products = require('../db/products');
const postIsValid = products.postValidator;
const putIsValid = products.putValidator;
const deleteIsValid = products.deleteValidator;
const storeProduct = products.storeProduct;
const productMap = products.getProductList();
const updatePropertiesWith = products.updatePropertiesWith;

router.get('/', (req, res) => {
  res.render('index', {products: productMap, productMessages: res.locals.messages()});
});

router.post('/', (req, res) => {
  let newProduct = req.body;
  if(postIsValid(newProduct)){
    storeProduct(newProduct);
    res.redirect('/products');
  } else {
    req.flash("error", "Invalid Post..Create new product!");
    res.redirect('/products/new');
  }
});

router.put('/:id', (req, res) => {
    let newProduct = req.body;
    let addressID = req.params.id;
    let targetID = req.body.id;
  if(putIsValid(newProduct, addressID)){
    updatePropertiesWith(newProduct, req, res);
  } else {
      req.flash("error", "Update failed..can't find item...try again!");
      res.redirect(303, `/products/${targetID}/edit`);
    }
    res.redirect(303, `/products/${targetID}`);
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