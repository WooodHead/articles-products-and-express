const PG_PASS = process.env.PG_PASS;
const pgp = require('pg-promise')();
const articlesdb = pgp({
    host: 'localhost',
    port: 5432,
    database: 'articles_db',
    user: 'matthewtirrell',
    password: PG_PASS
});

