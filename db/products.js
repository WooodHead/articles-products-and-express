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

function getSpecificProduct(id) {
    return db.one(`SELECT * FROM products WHERE id = ${id}`);

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
                )`
            );
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

function updatePropertiesWith(product) {
  let targetID = product.id;
  return db.none(`UPDATE products
                    SET
                        name = '${product.name}'
                        price = ${product.price},
                        inventory = ${product.inventory}
                    WHERE id = ${targetID};
    `);
}


module.exports = {
  getProductList:getProductList,
  getSpecificProduct: getSpecificProduct,
  storeProduct: storeProduct,
  postValidator: postIsValid,
  putValidator: putIsValid,
  deleteProduct: deleteProduct,
  //deleteValidator: deleteIsValid,
  updatePropertiesWith: updatePropertiesWith
};