//jshint esversion: 6
const express = require('express');
const router = express('router');
const products = require('../db/products');

router.get('/', (req, res) => {
  res.render('index', products);
});

let id = 0;

router.post('/', (req, res) => {
  console.log(req.body);
  if(req.body.hasOwnProperty('name') && req.body.hasOwnProperty('price') && req.body.hasOwnProperty('inventory')){
    let productObject = {
      id: id,
      name: req.body.name,
      price: req.body.price,
      inventory: req.body.inventory
    };
    products.productList.push(productObject);
    res.redirect('/products');
  } else {
    res.redirect(400, '/products/new');
  }
  id++;
});

router.put('/:id', (req, res) => {
    console.log(req.params.id);
    let newId = req.params.id;
    console.log(products.productList.length);
    for(let i = 0; i < products.productList.length; i++){
      console.log(products.productList[i].id);
      if(products.productList[i].id === newId){
        console.log(products.productList[i].id);
        if(req.body.hasOwnProperty('name')){
          products.productList[i].name = req.body.name;
        } else if(req.body.hasOwnProperty('price')){
          products.productList[i].price = req.body.price;
        } else if(req.body.hasOwnProperty('inventory')){
          products.productList[i].inventory = req.body.inventory;
        }
      } else {
        res.redirect(400, '/products/:id/edit');
      }
    }
    res.redirect('/products/:id');
});


module.exports = router;