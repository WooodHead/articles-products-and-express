const PG_PASS = process.env.PG_PASS;
const pgp = require('pg-promise')();
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'articles_products_db',
    user: 'matthewtirrell',
    password: PG_PASS
});

function getProductList() {
  return db.any('SELECT * FROM products');
}

function editSpecificProduct(id) {
    return db.one(`SELECT * FROM products WHERE id = ${id}`);
}

function getSpecificProduct(res, id) {
    db.one(`SELECT * FROM products WHERE id = ${id}`)
        .then( result => {
            res.render('./partials/product', {products:result, messages: res.locals.messages()});
        })
        .catch( err => console.error(err));
}

function storeProduct(product) {

    return db.none(`INSERT INTO products
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
                )`);
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

function deleteProduct(id) {
    return db.none(`DELETE FROM products WHERE id = ${id}`);
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
        db.none(`UPDATE products
                SET name = '${product.name}'
                WHERE id = ${targetID}`);
    } else {
      req.flash("error", "Update failed...must have a value and can't be a number!");
      res.redirect(303, `/products/${targetID}/edit`);
    }
  }
  if(product.hasOwnProperty('price')){
    if(product.price !== '' && typeof parseInt(product.price) == "number"){
        db.none(`UPDATE products
                SET price = ${product.price}
                WHERE id = ${targetID}`);
    //productList[targetID].price = product.price;
    } else {
      req.flash("error", "Update failed...must have a value and can't be a number!");
      res.redirect(303, `/products/${targetID}/edit`);
    }
  }
  if(product.hasOwnProperty('inventory')){
    if(product.inventory !=='' && typeof parseInt(product.inventory) === "number"){
        db.none(`UPDATE products
                SET inventory = ${product.inventory}
                WHERE id = ${targetID}`);
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