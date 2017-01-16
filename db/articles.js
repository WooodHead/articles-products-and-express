let articleList = {};

function bodyIsValid(article) {
  if(article.hasOwnProperty('title') && article.hasOwnProperty('body') && article.hasOwnProperty('author')){
    return true;
  } else {
    return false;
  }
}

function titleIsValid(article, address) {
  if(article.hasOwnProperty('title') && article.title === address && articleMap.hasOwnProperty(article.title)){
    return true;
  } else {
    return false;
  }
}

function isValidToDelete(address) {
  if(articleMap.hasOwnProperty(address)){
    return true;
  } else {
    return false;
  }
}

module.exports = {
  bodyValidator: bodyIsValid,
  titleValidator: titleIsValid,
  deleteValidator: isValidToDelete
};