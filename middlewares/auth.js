const { verifyToken } = require('../helpers/jwt');
const {User, Product} = require('../models');

const authenticate = (req, res, next) => {
  try {
    let {id} = verifyToken(req.headers.access_token)
    User.findOne({where: {id}})
    .then(user => {
      req.current_user = {id: user.id, email: user.email, role:user.role}
      next()
    })
    .catch(err => {
      throw err
    })
  } catch (error) { 
    next({status_code: 401, message: "unauthorized"})
  }
}

const authorize = (req, res, next) => {
  Product.findOne({
    where: {
      id: +req.params.id,
      UserId: +req.current_user.id
    }
  })
  .then(data => {
    if (data){
      next()
    }
    else{
      next({status_code: 401, mesage: "unauthorized"})
    }
  })
  .catch(err => {
    res.status(401).json({message: 'no resources found'})
  })
}

module.exports = {
  authenticate,
  authorize
}
