const request = require('supertest');
const app = require('../app.js');
const {User} = require('../models')
const {generateToken} = require('../helpers/jwt');
const { post } = require('../app.js');

let tokenAdmin = "";

beforeAll(function(done){
  const body = {
    email: 'admin@mail.com',
    password: '1234'
  }
  request(app)
    .post('/login')
    .send(body)
    .end((err, res) => {
      if (err) {
        done(err)
      }
      else {
        tokenAdmin = res.body.access_token
        done()
      }
    })
})
describe("testing post products", () => {
  describe("testing post /Products success", () => {
    it("should return response with status code 201", function(done) {
      const body = {
        name: "samsung",
        image_url: "https",
        price: 19000000,
        stock: 20,
      }
      request(app)
        .post("/products")
        .send(body)
        .set('access_token', tokenAdmin)
        .end((err, res) => {
          if (err) {
            done(err)
          } else {
            expect(res.statusCode).toEqual(201)
            expect(typeof res.body).toEqual("object")
            expect(res.body).toHaveProperty("name", body.name)
            expect(res.body).toHaveProperty("image_url", body.image_url)
            expect(res.body).toHaveProperty("price", body.price)
            expect(res.body).toHaveProperty("stock", body.stock)
            done()
          }
        })
    })
  })
})

describe("testing put /products/:id", () => {
  describe("testing put /products/:id success", () => {
    it("should return response with status code 200", (done) => {
      const body = {
        name: "nokia",
        image_url: "https",
        price: 2000000,
        stock: 50,
      }
      request(app)
        .put("/products/1")
        .send(body)
        .set('access_token', tokenAdmin)
        .end((err, res) => {
          if(err) {
            done(err)
          }else {
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual("object")
            expect(res.body).toHaveProperty("message", "product updated")
            done()
          }
        })
    })
  })
})

describe("testing delete /products/:id", () => {
  describe("testing delete /products/:id", () => {
    it("should return response with status code 401, dont have access_token", (done) => {
      request(app)
        .delete("/products/1")
        .set("access_token", tokenAdmin)
        .end((err, res) => {
          if (err) {
            done(err)
          } else {
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual("object")
            expect(res.body).toHaveProperty("message", "product deleted")
            done()
          }
        })
    })
  })
})



