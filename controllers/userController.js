const {User} = require('../models');
const {comparePassword} = require('../helpers/passwordHelper');
const {generateToken} = require('../helpers/jwt');

class UserController{

  static login(req, res, next){
    let {id, email, password} = req.body
    User.findOne({where: {email}})
      .then(user => {
        if (user) {
          const validPass = comparePassword(password, user.password);
          
          if(validPass){
            let payload = { id: user.id, email: user.email}
            res.status(200).json({
              id,
              email,
              access_token:generateToken(payload)
            }) 
          } else{
            throw { msg: 'invalid email or password' }
          }
        }else{
          throw { msg: 'invalid email or password' }
        }
      })
      .catch(err => {
        if (err.errors){
          let errors = [];
          err.errors.forEach(error => {
            errors.push(error.message)
          })
          if ( errors.length ){
            
            next({status_code: 400, message: errors})
          } else {
            next({status_code: 500, message: 'invalid internal server'})
          }
        }else {
          next({status_code: 400, message: err})
        }
      })
  }
}

module.exports = UserController