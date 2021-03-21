const {Product} = require('../models');

class ProductController{

  static create(req, res, next){
    const newProduct = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock:req.body.stock
    }
    Product.create(newProduct)
      .then( product => {
        res.status(201).json(product)
      })
      .catch(err => {
        let errors = []
        err.errors.map(err => {
          errors.push(err.message)
        })
        if(errors){
          next({status_code: 400, message: errors})
        }else{
          next({status_code: 500, message: 'invalid internal server'}) 
        }
      })
  }

  static read(req, res, next){
    Product.findAll()
      .then(data => {
        // console.log(data, 'dari controller');
        res.status(200).json(data)
      })
      .catch( err => {
        next({status_code: 500, message: 'invalid internal server'})
      })
  }

  static readOne(req, res, next){
    let id = +req.params.id
    Product.findByPk(id)
      .then(data => {
        if ( data ){
          res.status(200).json(data)
        } 
        else {
          next({status_code: 404, message: 'error not found'})
        }
      })
      .catch(err => {
        next({status_code:500, message: 'invalid internal server'})
      })
  }

  static update(req, res, next){
    const updateProduct = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock
    }
    Product.update(updateProduct, {
      where:{
        id: +req.params.id
      }
    })
      .then(data => {
        res.status(200).json({message: "product updated"})
      })
      .catch(err => {
        let errors = []
        err.errors.map(err => {
          errors.push(err.message)
        })
        if(errors){
          next({status_code: 400, message: errors})
        }else{
          next({status_code: 500, message: 'invalid internal server'}) 
        }
      })
  }

  static delete(req, res, next){
    Product.destroy({
      where: {
        id: +req.params.id
      }
    })
    .then(data => {
      res.status(200).json({message: "product deleted"})
    })
    .catch(err => {
      next({status_code: 500, message: 'invalid internal server'})
    })
  }
}

module.exports = ProductController