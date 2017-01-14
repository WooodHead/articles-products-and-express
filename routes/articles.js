const express = require('express');
const router = express('router');
const articles = require('../db/articles');
let articleMap = articles.articleList;

router.get('/', (req, res) => {
  res.send("sanity");
});

router.post('/', (req, res) => {
  let newArticle = req.body;
  if(bodyIsValid(newArticle)){
    let savedArticle = {
      title: newArticle.title,
      body: newArticle.body,
      author: newArticle.author,
      urlTitle: encodeURIComponent(newArticle.title)
    };
    articleMap[newArticle.title] = savedArticle;
    res.send(articleMap);
  } else {
    res.send("error");
  }
});

router.put('/:title', (req, res) => {
  let newArticle = req.body;
  let articlePath = req.params.title;
  console.log(articlePath);
  console.log(newArticle.title);
  let storedArticle = articleMap[req.body.title];

  if(titleIsValid(newArticle, articlePath)){
    switch(true){
      case newArticle.hasOwnProperty('title'):
        storedArticle.title = newArticle.title;
        break;
      case newArticle.hasOwnProperty('body'):
        storedArticle.body = newArticle.body;
        break;
      case newArticle.hasOwnProperty('author'):
        storedArticle.author = newArticle.author;
        break;
      default:
        res.send(' switch error');
    }
  } else {
    res.send(' validation error');
  }
  res.send(articleMap);
});

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



module.exports = router;