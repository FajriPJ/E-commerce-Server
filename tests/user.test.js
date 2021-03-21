const request = require("supertest")
const app = require("../app")

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