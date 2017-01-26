\c matthewtirrell

DROP DATABASE IF EXISTS products_db;
CREATE DATABASE products_db;

\c products_db;

DROP TABLE IF EXISTS products;
CREATE TABLE products
(
id serial PRIMARY KEY NOT NULL,
name varchar(90) NOT NULL,
price integer NOT NULL,
inventory integer NOT NULL
);