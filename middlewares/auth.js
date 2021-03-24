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

  if (req.current_user.role === 'admin'){
    next()
  } else {
    console.log('masuk authorized');
    next({status_code: 401})
  }
}

module.exports = {
  authenticate,
  authorize
}
