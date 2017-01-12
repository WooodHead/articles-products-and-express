//jshint esversion: 6
const express = require('express');
const router = express('router');
const products = require('../db/products');

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
    //res.redirect
  } else {
    res.json({"success": false});
  }
  id++;
});

//router.put(`/products/:id`)


module.exports = router;