
const express = require('express');
const router = express('router');
const products = require('../db/products');
const itemArray = products.productList;

router.get('/', (req, res) => {
  res.render('index', products);
});

router.post('/', (req, res) => {
  let newProduct = req.body;
  if(postIsValid(newProduct)){
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

    if(putIsValid(newProduct, addressID)){
      switch(true){
        case newProduct.hasOwnProperty('name'):
          itemArray[newID].name = newProduct.name;
          break;
        case newProduct.hasOwnProperty('price'):
          itemArray[newID].price = newProduct.price;
          break;
        case newProduct.hasOwnProperty('inventory'):
          itemArray[newID].inventory = newProduct.inventory;
          break;
        default:
          res.redirect(303, `/products/${addressID}/edit`);
      }
    } else {
      res.redirect(303, `/products/${addressID}/edit`);
    }
    res.redirect(303, `/products/${newID}`);
});

router.delete('/:id', (req, res) => {
  let addressID = req.params.id;
  if(deleteIsValid(addressID)){
    itemArray.splice(addressID, 1);
  } else {
    res.send("error");
  }
  res.redirect(303, '/products');
});

router.get('/new', (req, res) => {
  res.render('./partials/new');
});

router.get('/:id', (req, res) => {
  let targetID = req.params.id;
  res.render('./partials/product', itemArray[targetID]);
});

router.get('/:id/edit', (req, res) => {
  targetID = req.params.id;
  res.render('./partials/edit', itemArray[targetID]);
});

function postIsValid(product) {
  if(product.hasOwnProperty('name') && product.hasOwnProperty('price') && product.hasOwnProperty('inventory')){
    return true;
  } else {
    return false;
  }
}

function putIsValid(product, addressID) {
  if(product.hasOwnProperty('id') && product.id === addressID && product.id < itemArray.length && product.id > 0){
    return true;
  } else {
    return false;
  }
}
function deleteIsValid(address) {
  if(address < itemArray.length && address > 0){
    return true;
  } else {
    return false;
  }
}


module.exports = router;