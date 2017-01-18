const server = require('../server.js');
const supertest = require('supertest');
const express = require('express');
const chai = require('chai');
chai.should();

const agent = supertest.agent(server);

describe('Articles and Products API', () => {

  describe('GET /products', () => {

    it("should display an html page..", () => {
      agent.get('/products')
        .expect("Content-Type", /html/)
        .expect(200)
        .expect("content-length", '204')
        .end((err, res) => {
          if (err) throw err;
          console.log("response is: ", res.render('index'));
        });
    });
  });
});