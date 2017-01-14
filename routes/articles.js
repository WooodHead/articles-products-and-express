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
  let storedArticle = articleMap[newArticle.title];
  if(titleIsValid(newArticle, articlePath)){
    if(newArticle.hasOwnProperty('body')){
      storedArticle.body = newArticle.body;
    }
    if(newArticle.hasOwnProperty('author')){
      storedArticle.author = newArticle.author;
    }
  } else {
    res.send(' validation error');
  }
  res.send(articleMap);
});

router.delete('/:title', (req, res) => {
  let articlePath = req.params.title;
  console.log(articlePath);
  if(isValidToDelete(articlePath)){
    delete articleMap[articlePath];
  } else {
    return ("can't delete");
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

function isValidToDelete(address) {
  if(articleMap.hasOwnProperty(address)){
    return true;
  } else {
    return false;
  }
}

module.exports = router;