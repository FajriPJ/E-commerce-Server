const {User , Product, Cart} = require('../models');

class CartController{

  static readCart(req, res, next){
    // console.log('masukread');
    let UserId= req.current_user.id
    // console.log(UserId);
    Cart.findAll({
      include:[User, Product],
      where:{
        UserId,
      }
    })
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static createCart(req, res, next){
    // console.log('masuk 1');
    let ProductId = +req.params.productId
    let UserId = req.current_user.id
    let quantity = 1
    let newCart = {ProductId, UserId, quantity}

    Cart.findOne({
      where: {
        ProductId,
        UserId
      }
    })
    .then( cart => {
      if (cart) {
        cart.quantity = cart.quantity + 1
        cart.save()
      } else {
        return Cart.create(newCart)
      }
    })
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      next({status_code: 500, message: 'invalid internal server'}) 
    })
  }

  static removeCart(req, res, next){
    
    Cart.destroy({
      where: {
        id: +req.params.cartId
      }
    })
    .then(data => {
      console.log(data, '----------delete');
      res.status(200).json({message: "cart removed"})
    })
    .catch(err => {
      next({status_code: 500, message: 'invalid internal server'})
    })
  }

  static updateCart(req, res, next){

    const quantity = {quantity: req.body.quantity}

    Cart.findOne({  
      where: {id: +req.params.cartId},
      include: Product
    })
    .then(data => {
      if(data.Product.stock < quantity.quantity){
        next({status_code: 400, message: 'stock unvailable'})
      } else {
        return Cart.update(quantity, {
          where:{
            id: +req.params.cartId
          }
        })
      }
    })
    .then(data => {
      res.status(200).json({message: 'quantity updated'})
    })
    .catch(err => {
      next({status_code: 500, message: 'invalid internal server'})
    })
  }
}

module.exports = CartController