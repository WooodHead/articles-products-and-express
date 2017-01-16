
let productList = {};

function createID() {
  let ID = Math.floor(100000 + Math.random() * 900000);
  ID = ID.toString().substring(0,4);
  ID = parseInt(ID);
  return ID;
}

function getProductList() {
  return productList;
}

function storeProduct(product) {
  let productObject = {
      id: createID(),
      name: product.name,
      price: parseInt(product.price),
      inventory: parseInt(product.inventory)
    };
  productList[productObject.id] = productObject;
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

function updatePropertiesWith(product) {
  let targetID = product.id;
  if(product.hasOwnProperty('name')){
    productList[targetID].name = product.name;
  }
  if(product.hasOwnProperty('price')){
    productList[targetID].price = product.price;
  }
  if(product.hasOwnProperty('inventory')){
    productList[targetID].inventoryn = product.inventory;
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