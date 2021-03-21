const request = require('supertest');
const app = require('../app.js');
const {User} = require('../models')
const {generateToken} = require('../helpers/jwt');

let tokenAdmin = "";

beforeAll(function(done){
  // proses login untuk ngambil access_token
  User.findOne({
    where: {
      email: "admin@mail.com"
    }
  })
  .then((user) => {
    tokenAdmin = generateToken({
      email: user.email,
      role: user.role
    })
    done()
  })
})

describe("testing GET /Prodcuts success", () => {
  it("should return response with status code 200", (done) => {
    // execute
    request(app)
      .get("/products")
      .set("access_token")
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          expect(typeof res.body).toEqual("object")
          done()
        }
      })
  })
})



