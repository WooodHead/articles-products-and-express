const express = require('express');
const router = express('router');
const articles = require('../db/articles');
let articleMap = articles.articleList;

router.get('/', (req, res) => {
  res.render('index', {articles: articles, articleMessages: res.locals.messages()});
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
    res.redirect('/articles');
  } else {
    req.flash("error", "Invalid post..create new article!");
    res.redirect('/articles/new');
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
    req.flash("error", "Update failed...try again!");
    res.redirect(303,`/articles/${storedArticle.urlTitle}/edit`);
  }
  res.redirect(303, `/articles/${storedArticle.urlTitle}`);
});

router.delete('/:title', (req, res) => {
  let articlePath = req.params.title;
  let articleAddress = encodeURIComponent(articlePath);
  console.log(articlePath);
  if(isValidToDelete(articlePath)){
    delete articleMap[articlePath];
  } else {
    req.flash("error", "Delete unsuccessful...");
    res.redirect(303,`/articles/${articleAddress}`);
  }
  req.flash("info", "Delete success!");
  res.redirect(303, '/articles');
});

router.get('/new', (req, res) => {
  res.render('./partials/new_article', {messages: res.locals.messages()});
});

router.get('/:title', (req, res) => {
  let articleKey = req.params.title;
  res.render('./partials/article', {articles: articleMap[articleKey], messages: res.locals.messages()});
});
router.get('/:title/edit', (req, res) => {
  console.log(req.params.title);
  let articleKey = req.params.title;
  res.render('./partials/edit_article', {articles: articleMap[articleKey], messages: res.locals.messages()});
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