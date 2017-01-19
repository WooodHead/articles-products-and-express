let articleList = {};

function getArticles() {
  return articleList;
}

function storeArticle(article) {
  let savedArticle = {
      title: article.title,
      body: article.body,
      author: article.author,
      urlTitle: encodeURIComponent(article.title)
    };
  articleList[savedArticle.title] = savedArticle;
}

function postIsValid(article) {
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

function putIsValid(article, address) {
  if(article.hasOwnProperty('title') && article.title === address && articleList.hasOwnProperty(article.title)){
      return true;
    } else {
    return false;
  }
}

function isValidToDelete(address) {
  if(articleList.hasOwnProperty(address)){
    return true;
  } else {
    return false;
  }
}

function updatePropertiesWith(article, req, res) {
  let articleKey = article.title;
  if(article.hasOwnProperty('body')){
    if(article.body !== '' && isNaN(parseInt(article.body))){
      articleList[articleKey].body = article.body;
    } else {
      req.flash("error", "Update failed...try again!");
      res.redirect(303,`/articles/${articleList[articleKey].urlTitle}/edit`);
    }
  }
  if(article.hasOwnProperty('author')){
    if(article.author !== '' && isNaN(parseInt(article.author))){
      articleList[articleKey].author = article.author;
    } else {
      req.flash("error", "Update failed...try again!");
      res.redirect(303,`/articles/${articleList[articleKey].urlTitle}/edit`);
    }
  }
}

module.exports = {
  getArticles: getArticles,
  storeArticle: storeArticle,
  putValidator: putIsValid,
  postValidator: postIsValid,
  deleteValidator: isValidToDelete,
  updatePropertiesWith: updatePropertiesWith
};