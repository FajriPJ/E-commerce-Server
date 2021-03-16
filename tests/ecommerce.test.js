const request = require('supertest');
const app = require('../app.js');
const {User} = require('../models')
const jwt = require('../helpers/jwt');
const {generateToken} = require('../helpers/jwt');
const {comparePassword} = require('../helpers/passwordHelper');

describe("testing /login", function(){

  
  describe("testing POST /login success", function(){
    it("should return response with status code 200", function(done){
      
      const body = {
        email: "admin@mail.com",
        password: "1234"
      }

      request(app)
      .post("/login")
      .send(body)
      .end(function(err, res) {
        if (err){
          done(err)
        } else{
          expect(res.status).toEqual(200)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("email", body.email)
          expect(res.body).toHaveProperty("access_token")
          
          done()
        }
      })
    })
  })

  describe("testing POST /login failed", function(){
    it("should return response with status code 400", function(done){
      const body = {
        email: "",
        Password: ""
      }
      request(app)
      .post("/login")
      .send(body)
      .end(function(err, res) {
        if (err){
          done(err)
        } else{
          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual("object")
          expect(typeof res.body.message.msg).toEqual("string")
          done()
        }
      })
    })
  })
})

describe("testing /products" , function(){
  beforeAll(function(){
    // proses login untuk ngambil access_token
    
  })
  // create
  describe("testing POST /products success", function(){
    it("should return response with status code 201", function(done){

      const body = {
        //setup
        name: "name",
        image_url: "image_url",
        price: 10000,
        stock: 12
      }
      //execute
      request(app)
      .post("/products")
      .send(body)
      .end(function(err, res) {
        if(err){
          done(err)
        }else {
          //assert
          expect(res.status).toEqual(201)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("id")
          expect(typeof res.body.id).toEqual("number")
          expect(res.body).toHaveProperty("name", body.name)
          expect(res.body).toHaveProperty("image_url", body.image_url)
          expect(res.body).toHaveProperty("price", body.price)
          expect(res.body).toHaveProperty("stock", body.stock)
          done()
        }
      })
    })
  })

  describe("testing POST /products failed", function(){
    // it("should return response with status code 400", function(done){

    //   const body = {
    //     //setup
    //     name: "",
    //     image_url: "",
    //     price= 0,
    //     stock= 0 
    //   }
    //   //execute
    //   request(app)
    //   .post("/products")
    //   .send(body)
    //   .end(function(err, res) {
    //     if(err){
    //       done(err)
    //     }else {
    //       //assert
    //       expect(res.status).toEqual(400)
    //       expect(typeof res.body).toEqual("object")
    //       expect(res.body).toHaveProperty("errors")
    //       expect(Array.isArray(res.body.errors)).toEqual(true)
    //       done()
    //     }
    //   })
    // })
  })

  // read
  describe("testing GET /products success", function(){
    it("should return response with status code 200", function(done) {
      const body = {
        //setup
        name: "name",
        image_url: "image_url",
        price: 10000,
        stock: 12
      }
      //execute
      request(app)
      .get("/products")
      .send(body)
      .end(function(err, res) {
        if(err){
          done(err)
        }else {
          //assert
          expect(res.status).toEqual(200)
          expect(typeof res.body).toEqual("object")
          // expect(res.body).toHaveProperty("array")
          expect(res.body.image_url).toHaveProperty("image_url", body.image_url)
          // expect(res.body).toHaveProperty("price", body.price)
          // expect(res.body).toHaveProperty("stock", body.stock)

          done()
        }
      })
    })
  })
  
  describe("testing GET /products failed", function(){

  })
  // readOne
  describe("testing GET /products/:id success", function(){
    it("should return response with status code 200", function(done) {
      const body = {
        //setup
        name: "name",
        image_url: "image_url",
        price: 10000,
        stock: 12
      }
      //execute
      request(app)
      .get("/products")
      .send(body)
      .end(function(err, res) {
        if(err){
          done(err)
        }else {
          //assert
          expect(res.status).toEqual(200)
          done()
        }
      })
    })
  })
  describe("testing GET /products/:id failed", function(){

  })
  //put
  describe("testing PUT /products/:id success", function(){

  })

  describe("testing PUT /products/:id failed", function(){

  })
  //delete
  describe("testing DELETE /products/:id success", function(){

  })
  describe("testing DELETE /products/:id success", function(){

  })
})    

