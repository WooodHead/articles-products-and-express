\c matthewtirrell

DROP DATABASE IF EXISTS articles_products_db;
CREATE DATABASE articles_products_db;

\c articles_products_db

DROP TABLE IF EXISTS articles;
CREATE TABLE articles
(
id serial PRIMARY KEY NOT NULL,
title text NOT NULL,
body text NOT NULL,
author text NOT NULL,
urltitle varchar(90) NOT NULL
);

DROP TABLE IF EXISTS products;
CREATE TABLE products
(
id serial PRIMARY KEY NOT NULL,
name text NOT NULL,
price integer NOT NULL,
inventory integer NOT NULL
);