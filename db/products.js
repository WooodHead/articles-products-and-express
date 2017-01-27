const PG_PASS = process.env.PG_PASS;
const pgp = require('pg-promise')();
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'articles_products_db',
    user: 'matthewtirrell',
    password: PG_PASS
});

function getProductList(res) {
  db.any('SELECT * FROM products')
    .then( result => {
          res.render('index', {products: result, productMessages: res.locals.messages()});
    })
    .catch( err => console.error(err));
}

function editSpecificProduct(res, id) {
    db.one(`SELECT * FROM products WHERE id = ${id}`)
        .then( result => {
            res.render('./partials/edit_product', {products:result, messages: res.locals.messages()});
        })
        .catch( err => console.error(err));
}

function getSpecificProduct(res, id) {
    db.one(`SELECT * FROM products WHERE id = ${id}`)
        .then( result => {
            res.render('./partials/product', {products:result, messages: res.locals.messages()});
        })
        .catch( err => console.error(err));
}

function storeProduct(product, req, res) {

    db.one(`INSERT INTO products
        (
        name,
        price,
        inventory
        )
        VALUES
        (
        '${product.name}',
        ${parseInt(product.price)},
        ${parseInt(product.inventory)}
        )`).then( result => {
            console.log("result", result);
        }).catch(err => {
            req.flash("error", "Invalid Post..Create new product!");
            res.redirect('/products/new');
        });
}

function postIsValid(product) {
  if(product.hasOwnProperty('name') && product.hasOwnProperty('price') && product.hasOwnProperty('inventory')){
    if(product.name !== '' && product.price !== '' && product.inventory !== ''){
      if(isNaN(parseInt(product.name)) && typeof parseInt(product.price) === "number" && typeof parseInt(product.inventory) === "number"){
        return true;
      } else {
        return false;
      }
    }else {
      return false;
    }
  } else {
    return false;
  }
}



function putIsValid(product, addressID) {
  if(product.hasOwnProperty('id') && product.id === addressID){
    return true;
  } else {
    return false;
  }
}

function deleteProduct(req, res, id) {
    db.one(`DELETE FROM products WHERE id = ${id}`)

        .catch( error => {
            console.log("this is the error" ,error);
            req.flash("error", error.message);
            res.redirect(303, `/products/`);
        } );
}

// function deleteIsValid(ID) {
//   if(productList.hasOwnProperty(ID)){
//     return true;
//   } else {
//     return false;
//   }
// }

function updatePropertiesWith(product, req, res) {
  let targetID = product.id;
  if(product.hasOwnProperty('name')){
    if(product.name !== '' && isNaN(parseInt(product.name))){
    //productList[targetID].name = product.name;
        db.one(`UPDATE products
                SET name = '${product.name}'
                WHERE id = '${targetID}'`);
    } else {
      req.flash("error", "Update failed...must have a value and can't be a number!");
      res.redirect(303, `/products/${targetID}/edit`);
    }
  }
  if(product.hasOwnProperty('price')){
    if(product.price !== '' && typeof parseInt(product.price) == "number"){
        db.one(`UPDATE products
                SET price = '${product.price}'
                WHERE id = '${targetID}'`);
    //productList[targetID].price = product.price;
    } else {
      req.flash("error", "Update failed...must have a value and can't be a number!");
      res.redirect(303, `/products/${targetID}/edit`);
    }
  }
  if(product.hasOwnProperty('inventory')){
    if(product.inventory !=='' && typeof parseInt(product.inventory) === "number"){
        db.one(`UPDATE products
                SET inventory = '${product.inventory}'
                WHERE id = '${targetID}'`);
    //productList[targetID].inventory = product.inventory;
    } else {
      req.flash("error", "Update failed...must have a value and can't be a number!");
      res.redirect(303, `/products/${targetID}/edit`);
    }
  }
}


module.exports = {
  getProductList:getProductList,
  getSpecificProduct: getSpecificProduct,
  editSpecificProduct: editSpecificProduct,
  storeProduct: storeProduct,
  postValidator: postIsValid,
  putValidator: putIsValid,
  deleteProduct: deleteProduct,
  //deleteValidator: deleteIsValid,
  updatePropertiesWith: updatePropertiesWith
};