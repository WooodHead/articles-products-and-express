
const express = require('express');
const router = express('router');
const products = require('../db/products');
const productMap = products.productList;

router.get('/', (req, res) => {
  res.render('index', products);
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
    productMap[ID] = productObject;
    ID++;
    req.flash("info", "posting stuff");
    res.redirect('/products');
  } else {
    res.redirect(400, '/products/new');
  }
});

router.put('/:id', (req, res) => {
    console.log(req.body);
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
      req.flash("error", "Request failed..sending to edit page");
      res.redirect(303, `/products/${newID}/edit`);
    }
    res.redirect(303, `/products/${newID}`);
});

router.delete('/:id', (req, res) => {
  let targetID = req.params.id;
  if(deleteIsValid(targetID)){
    delete productMap[targetID];
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
  res.render('./partials/product', productMap[targetID]);
});

router.get('/:id/edit', (req, res) => {
  targetID = req.params.id;
  res.render('./partials/edit_product', productMap[targetID]);
});

function postIsValid(product) {
  if(product.hasOwnProperty('name') && product.hasOwnProperty('price') && product.hasOwnProperty('inventory')){
    return true;
  } else {
    return false;
  }
}

function putIsValid(product, addressID) {
  if(product.hasOwnProperty('id') && product.id === addressID && productMap.hasOwnProperty(product.id)){
    return true;
  } else {
    return false;
  }
}
function deleteIsValid(address) {
  if(productMap.hasOwnProperty(address)){
    return true;
  } else {
    return false;
  }
}


module.exports = router;