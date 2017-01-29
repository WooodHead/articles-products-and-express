const express = require('express');
const router = express('router');
const articles = require('../db/articles');
const postIsValid = articles.postValidator;
const putIsValid = articles.putValidator;
const deleteArticle = articles.deleteArticle;
const storeArticle = articles.storeArticle;
const getArticles = articles.getArticles;
const getSpecificArticle = articles.getSpecificArticle;
const updatePropertiesWith = articles.updatePropertiesWith;

router.get('/', (req, res) => {
    getArticles()
        .then(articleMap => {
            res.render('index', {articles: articleMap, articleMessages: res.locals.messages()});
        })
        .catch( error => {
            console.log(error);
        });

});

router.post('/', (req, res) => {
  let newArticle = req.body;
  let articleKey = newArticle.title;
  if(postIsValid(newArticle)){
        storeArticle(newArticle)
            .then( _ => {
                res.redirect('/articles');
            })
            .catch( error => {
                req.flash("error", error.msg);
                res.redirect('/articles/new');
            });
  } else {
    req.flash("error", "Invalid post..create new article!");
    res.redirect('/articles/new');
  }
});

router.put('/:title', (req, res) => {
  let newArticle = req.body;
  console.log(newArticle);
  let articleKey = req.body.title;
  let articlePath = req.params.title;
  if(putIsValid(newArticle, articlePath)){
    updatePropertiesWith(newArticle, articlePath)
        .then( _ => {
            res.redirect(303, `/articles/${encodeURIComponent(articleKey)}`);
        })
        .catch( error => {
            req.flash("error", "Update failed..invalid form entry..");
            res.redirect(303,`/articles/${encodeURIComponent(articleKey)}/edit`);
        });
  } else {
    req.flash("error", "Update failed...can't find item...try again!");
    res.redirect(303,`/articles/${encodeURIComponent(articleKey)}/edit`);
  }
});

router.delete('/:title', (req, res) => {
  let articlePath = req.params.title;
  let articleAddress = encodeURIComponent(articlePath);
  deleteArticle(articlePath);
  // if(isValidToDelete(articlePath)){
  //   delete articleMap[articlePath];
  // } else {
  //   req.flash("error", "Delete unsuccessful...");
  //   res.redirect(303,`/articles/${articleAddress}`);
  // }
  req.flash("info", "Delete success!");
  res.redirect(303, '/articles');
});

router.get('/new', (req, res) => {
  res.render('./partials/new_article', {messages: res.locals.messages()});
});

router.get('/:title', (req, res) => {
  let articleKey = req.params.title;
  getSpecificArticle(articleKey)
    .then( article => {
        res.render('./partials/article', {articles: article, messages: res.locals.messages()});
    })
    .catch( error => console.error(error));
});
router.get('/:title/edit', (req, res) => {
  let articleKey = req.params.title;
  getSpecificArticle(articleKey)
    .then( article => {
        res.render('./partials/edit_article', {articles: article, messages: res.locals.messages()});
    })
    .catch( error => console.error(error));
});

module.exports = router;