//jshint esversion: 6
const express = require('express');
const router = express('router');
const products = require('../db/products');
const itemArray = products.productList;

router.get('/', (req, res) => {
  res.render('index', products);
});

let id = 0;

router.post('/', (req, res) => {
  let newProduct = req.body;
  if(newProduct.hasOwnProperty('name') && newProduct.hasOwnProperty('price') && newProduct.hasOwnProperty('inventory')){
    let productObject = {
      id: itemArray.length,
      name: newProduct.name,
      price: newProduct.price,
      inventory: newProduct.inventory
    };
    itemArray.push(productObject);
     res.redirect('/products');
  } else {
    res.redirect(400, '/products/new');
  }
});

router.put('/:id', (req, res) => {
    let newProduct = req.body;
    let newID = req.body.id;

    if(newProduct.hasOwnProperty('name')){
      itemArray[newID].name = newProduct.name;
    }
    if(newProduct.hasOwnProperty('price')){
      itemArray[newID].price = newProduct.price;
    }
    if(newProduct.hasOwnProperty('inventory')){
      itemArray[newID].inventory = newProduct.inventory;
    }

    res.send(itemArray);
});

// router.get('/:id', (req, res) => {

// });


module.exports = router;