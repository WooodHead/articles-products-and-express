
let productList = {};

function getProductList() {
  return productList;
}
function storeProduct(product) {
  productList[product.id] = product;
}

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


module.exports = {
  getProductList:getProductList,
  storeProduct: storeProduct,
  postValidator: postIsValid,
  putValidator: putIsValid,
  deleteValidator: deleteIsValid

};