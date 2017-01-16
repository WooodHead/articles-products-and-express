let articleList = {};

function getArticles() {
  return articleList;
}

function storeArticle(article) {
  articleList[article.title] = article;
}

function bodyIsValid(article) {
  if(article.hasOwnProperty('title') && article.hasOwnProperty('body') && article.hasOwnProperty('author')){
    if(article.title !== '' && article.body !== '' && article.author !== ''){
      if(isNaN(parseInt(article.title)) && isNaN(parseInt(article.body)) && isNaN(parseInt(article.author))){
       return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function titleIsValid(article, address) {
  if(article.hasOwnProperty('title') && article.title === address && articleList.hasOwnProperty(article.title)){
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

function updatePropertiesWith(article) {
  let articleKey = article.title;
  if(article.hasOwnProperty('body')){
    articleList[articleKey].body = article.body;
  }
  if(article.hasOwnProperty('author')){
    articleList[articleKey].author = article.author;
  }
}

module.exports = {
  getArticles: getArticles,
  storeArticle: storeArticle,
  bodyValidator: bodyIsValid,
  titleValidator: titleIsValid,
  deleteValidator: isValidToDelete,
  updatePropertiesWith: updatePropertiesWith
};