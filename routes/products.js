//jshint esversion: 6
const express = require('express');
const router = express('router');
const products = require('../db/products');
const itemArray = products.productList;

router.get('/', (req, res) => {
  res.render('index', products);
});

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
    let addressID = req.params.id;

    if(newProduct.hasOwnProperty('id')){
      if(newID === addressID){
        if(newID < itemArray.length && newID > 0){
          if(newProduct.hasOwnProperty('name')){
        itemArray[newID].name = newProduct.name;
          }
          if(newProduct.hasOwnProperty('price')){
            itemArray[newID].price = newProduct.price;
          }
          if(newProduct.hasOwnProperty('inventory')){
            itemArray[newID].inventory = newProduct.inventory;
          }
        } else {
          res.send("id doesn't exist");
        }
      } else {
        res.send("id's don't match");
      }
    } else {
      res.send("no id property");
    }
    res.render('./partials/product', itemArray[newID]);
    // console.log(`/products/${newID}`);
    // res.redirect(`/products/${newID}`);
});

router.delete('/:id', (req, res) => {
  let addressID = req.params.id;
  let deletedID = req.body.id;
  let productToRemove = req.body;

  itemArray.splice(deletedID, 1);
  res.send(itemArray);

});

router.get('/:id', (req, res) => {
  console.log("this is the id:", req.params.id);
  let targetID = req.params.id;
  res.render('product', itemArray[targetID]);
});


module.exports = router;