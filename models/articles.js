const PG_PASS = process.env.PG_PASS;
const pgp = require('pg-promise')();
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'articles_products_db',
    user: 'matthewtirrell',
    password: PG_PASS
});


function getArticles() {
    return db.any('SELECT * FROM articles');
}


function getSpecificArticle(title) {
    return db.one(`SELECT * FROM articles WHERE title = '${title}'`);
}

function storeArticle(article) {
    return db.none(`INSERT INTO articles
                    (
                        title,
                        body,
                        author,
                        urltitle
                    )
                    VALUES
                    (
                        '${article.title}',
                        '${article.body}',
                        '${article.author}',
                        '${encodeURIComponent(article.title)}'
                    )
                `);
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
  if(article.hasOwnProperty('title') || article.title === address){
      return true;
    } else {
    return false;
  }
}

function deleteArticle (title) {
    return db.none(`DELETE FROM articles WHERE title = '${title}'`);
}

function updatePropertiesWith(article, oldArticleTitle) {
  let articleKey = article.title;
  return db.none(`UPDATE articles
                    SET
                        title = '${article.title}',
                        body = '${article.body}',
                        author = '${article.author}',
                        urltitle = '${encodeURIComponent(article.title)}'
                    WHERE title = '${oldArticleTitle}';
         `);
}

module.exports = {
  getArticles: getArticles,
  storeArticle: storeArticle,
  getSpecificArticle: getSpecificArticle,
  putValidator: putIsValid,
  postValidator: postIsValid,
  deleteArticle: deleteArticle,
  updatePropertiesWith: updatePropertiesWith
};