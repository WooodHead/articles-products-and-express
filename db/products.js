const PG_PASS = process.env.PG_PASS;
const pgp = require('pg-promise')();
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'articles_products_db',
    user: 'matthewtirrell',
    password: PG_PASS
});




// function createID() {
//   let ID = Math.floor(100000 + Math.random() * 900000);
//   ID = ID.toString().substring(0,4);
//   ID = parseInt(ID);
//   return ID;
// }


function getProductList(res) {
  db.any('SELECT * FROM products')
    .then( result => {
          res.render('index', {products: result, productMessages: res.locals.messages()});
    })
    .catch( err => console.error(err));
}

function storeProduct(product) {

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
        }).catch(err => console.error(err));
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
  if(product.hasOwnProperty('id') && product.id === addressID && productList.hasOwnProperty(product.id)){
    return true;
  } else {
    return false;
  }
}

function deleteIsValid(ID) {
  if(productList.hasOwnProperty(ID)){
    return true;
  } else {
    return false;
  }
}

function updatePropertiesWith(product, req, res) {
  let targetID = product.id;
  if(product.hasOwnProperty('name')){
    if(product.name !== '' && isNaN(parseInt(product.name))){
    productList[targetID].name = product.name;
    } else {
      req.flash("error", "Update failed...must have a value and can't be a number!");
      res.redirect(303, `/products/${targetID}/edit`);
    }
  }
  if(product.hasOwnProperty('price')){
    if(product.price !== '' && typeof parseInt(product.price) == "number"){
    productList[targetID].price = product.price;
    } else {
      req.flash("error", "Update failed...must have a value and can't be a number!");
      res.redirect(303, `/products/${targetID}/edit`);
    }
  }
  if(product.hasOwnProperty('inventory')){
    if(product.inventory !=='' && typeof parseInt(product.inventory) === "number"){
    productList[targetID].inventory = product.inventory;
    } else {
      req.flash("error", "Update failed...must have a value and can't be a number!");
      res.redirect(303, `/products/${targetID}/edit`);
    }
  }
}


module.exports = {
  getProductList:getProductList,
  storeProduct: storeProduct,
  postValidator: postIsValid,
  putValidator: putIsValid,
  deleteValidator: deleteIsValid,
  updatePropertiesWith: updatePropertiesWith
};