\c matthewtirrell

DROP DATABASE IF EXISTS articles_db;
CREATE DATABASE articles_db;

\c articles_db;

DROP TABLE IF EXISTS articles;
CREATE TABLE articles
(
id serial PRIMARY KEY NOT NULL,
title varchar(90) NOT NULL,
body varchar(250) NOT NULL,
author varchar(90) NOT NULL,
urlTitle varchar(510) NOT NULL
);
