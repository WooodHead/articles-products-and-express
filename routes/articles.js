const express = require('express');
const router = express('router');
const articles = require('../db/articles');
const bodyIsValid = articles.bodyValidator;
const titleIsValid = articles.titleValidator;
const isValidToDelete = articles.deleteValidator;
const storeArticle = articles.storeArticle;
const articleMap = articles.getArticles();
const updatePropertiesWith = articles.updatePropertiesWith;

router.get('/', (req, res) => {
  res.render('index', {articles: articleMap, articleMessages: res.locals.messages()});
});

router.post('/', (req, res) => {
  let newArticle = req.body;
  if(bodyIsValid(newArticle)){
    if(articleMap.hasOwnProperty(newArticle.title)){
      req.flash("error", "Sorry product exists..create new product");
      res.redirect('/articles/new');
    } else {
      storeArticle(newArticle);
      res.redirect('/articles');
    }
  } else {
    req.flash("error", "Invalid post..create new article!");
    res.redirect('/articles/new');
  }
});

router.put('/:title', (req, res) => {
  let newArticle = req.body;
  let articleKey = req.body.title;
  let articlePath = req.params.title;
  if(titleIsValid(newArticle, articlePath)){
    updatePropertiesWith(newArticle);
  } else {
    req.flash("error", "Update failed...try again!");
    res.redirect(303,`/articles/${articleMap[articleKey].urlTitle}/edit`);
  }
  res.redirect(303, `/articles/${articleMap[articleKey].urlTitle}`);
});

router.delete('/:title', (req, res) => {
  let articlePath = req.params.title;
  let articleAddress = encodeURIComponent(articlePath);
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
  let articleKey = req.params.title;
  res.render('./partials/edit_article', {articles: articleMap[articleKey], messages: res.locals.messages()});
});

module.exports = router;