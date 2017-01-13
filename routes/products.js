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
    let newProduct = req.body;
    let newID = req.body.id;

    if(newProduct.hasOwnProperty('name')){
      products.productList[newID].name = newProduct.name;
    }
    if(newProduct.hasOwnProperty('price')){
      products.productList[newID].price = newProduct.price;
    }
    if(newProduct.hasOwnProperty('inventory')){
      products.productList[newID].inventory = newProduct.inventory;
    }
    // for(let i = 0; i < products.productList.length; i++){
    //   console.log(products.productList[i].id)
    //   console.log(newProduct.id);
    //   if(products.productList[i][id] === newProduct.id){
    //     console.log("matched");
    //     if(newProduct.hasOwnProperty('name')){
    //       console.log("name");
    //       products.productList[i].name = newProduct.name;
    //     }
    //     if(newProduct.hasOwnProperty('price')){
    //       console.log("price");
    //       products.productList[i].price = newProduct.price;
    //     }
    //     if(newProduct.hasOwnProperty('inventory')){
    //       console.log('inventory');
    //       products.productList[i].inventory = neProduct.inventory;
    //     }
    //   }
    // }
    res.send(products.productList);
});

// router.get('/:id', (req, res) => {

// });


module.exports = router;