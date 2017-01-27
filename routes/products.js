
const express = require('express');
const router = express('router');
const products = require('../db/products');
const postIsValid = products.postValidator;
const putIsValid = products.putValidator;
const deleteIsValid = products.deleteValidator;
const storeProduct = products.storeProduct;
const updatePropertiesWith = products.updatePropertiesWith;
const getProductList = products.getProductList;
const editSpecificProduct = products.editSpecificProduct;
const getSpecificProduct = products.getSpecificProduct;
const deleteProduct = products.deleteProduct;

router.get('/', (req, res) => {
  getProductList()
       .then( result => {
                      res.render('index', {products: result, productMessages: res.locals.messages()});
                })
                .catch( err => console.error(err));
  //res.render('index', {products: productMap, productMessages: res.locals.messages()});
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
    //res.redirect('/products');
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
  deleteProduct(targetID)
    .then( _ => {
        req.flash("info", "Delete successful!");
        res.redirect(303, '/products');
    })
    .catch( error => {
        console.log("this is the error :", error);
        req.flash("error", "Delete unsuccessful..");
        res.redirect(303, `/products/`);
    });

  // if(deleteIsValid(targetID)){
  //   delete productMap[targetID];
  // } else {
  //   req.flash("error", "Delete unsuccessful..");
  //   res.redirect(303, `/products/${targetID}`);
  // }

});

router.get('/new', (req, res) => {
  res.render('./partials/new_product', {messages: res.locals.messages()});
});

router.get('/:id', (req, res) => {
  let targetID = req.params.id;
  getSpecificProduct(res, targetID);
});

router.get('/:id/edit', (req, res) => {
  targetID = req.params.id;
  editSpecificProduct(targetID)
    .then( result => {
            res.render('./partials/edit_product', {products:result, messages: res.locals.messages()});
        })
        .catch( err => console.error(err));
});

module.exports = router;