
const express = require('express');
const router = express('router');
const products = require('../models/products');
const postIsValid = products.postValidator;
const putIsValid = products.putValidator;
const deleteIsValid = products.deleteValidator;
const storeProduct = products.storeProduct;
const updatePropertiesWith = products.updatePropertiesWith;
const getProductList = products.getProductList;
const getSpecificProduct = products.getSpecificProduct;
const deleteProduct = products.deleteProduct;

router.get('/', (req, res) => {
  getProductList()
       .then( result => {
            res.render('index', {products: result, productMessages: res.locals.messages()});
                })
       .catch( error => console.error(error));
});

router.post('/', (req, res) => {
  let newProduct = req.body;
  if(postIsValid(newProduct)){
    storeProduct(newProduct)
        .then( _ => {
            res.redirect('/products');
        })
        .catch( err => {
            req.flash("error", err.message);
            res.redirect('/products/new');
        });
  } else {
    req.flash("error", "Invalid Post..Create new product!");
    res.redirect('/products/new');
  }
});

router.put('/:id', (req, res) => {
    console.log("new req ", req.body);
    let newProduct = req.body;
    let addressID = req.params.id;
    let targetID = req.body.id;
  if(putIsValid(newProduct, addressID)){
    updatePropertiesWith(newProduct)
        .then( _ => {
            res.redirect(303, `/products/${targetID}`);
        })
        .catch( error => {
            req.flash("error", "Update failed..incorrect form values!");
            res.redirect(303, `/products/${targetID}/edit`);
        });
  } else {
      req.flash("error", "Update failed..can't find item...try again!");
      res.redirect(303, `/products/${targetID}/edit`);
    }
});

router.delete('/:id', (req, res) => {
  let targetID = req.params.id;
  getSpecificProduct(targetID)
    .then( product => {
        deleteProduct(product.id);
        req.flash("info", "Delete successful!");
        res.redirect(303, '/products');
    })
    .catch( error => {
        req.flash("error", "Cannot delete...item does not exist!");
        res.redirect(303, '/products');
    });
});

router.get('/new', (req, res) => {
  res.render('./partials/new_product', {messages: res.locals.messages()});
});

router.get('/:id', (req, res) => {
  let targetID = req.params.id;
  getSpecificProduct(targetID)
    .then( result => {
            res.render('./partials/product', {products:result, messages: res.locals.messages()});
        })
     .catch( error => {
            req.flash("error", "Item does not exist..");
            res.redirect('/products');
     });
});

router.get('/:id/edit', (req, res) => {
  targetID = req.params.id;
  getSpecificProduct(targetID)
    .then( result => {
            res.render('./partials/edit_product', {products:result, messages: res.locals.messages()});
        })
    .catch( error => {
            req.flash("error", "Cannot find item..Please choose one from below..");
            res.redirect('/products');
    });
});

module.exports = router;