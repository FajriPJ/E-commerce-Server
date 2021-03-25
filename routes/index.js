const router = require('express').Router();
const ProductController = require('../controllers/productController');
const UserController = require('../controllers/userController');
const CartController = require('../controllers/cartController');
const {authenticate, authorize} = require('../middlewares/auth');

router.post("/register", UserController.register)
router.post("/login", UserController.login)

router.use(authenticate)

router.get("/cart", CartController.readCart)
router.post("/cart/:productId", CartController.createCart)
router.delete("/cart/:cartId", CartController.removeCart)
router.put("/cart/:cartId", CartController.updateCart)

router.get("/products", ProductController.read)
router.post("/products", ProductController.create)
router.get("/products/:id", ProductController.readOne)
router.put("/products/:id", authorize,ProductController.update)
router.delete("/products/:id", authorize,ProductController.delete)

module.exports = router