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
  }
});

function bodyIsValid(article) {
  if(article.hasOwnProperty('title') && article.hasOwnProperty('body') && article.hasOwnProperty('author')){
    return true;
  } else {
    return false;
  }
}



module.exports = router;