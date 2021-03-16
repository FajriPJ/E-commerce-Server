const router = require('express').Router();
const ProductController = require('../controllers/productController');
const UserController = require('../controllers/userController');
const {authenticate, authorize} = require('../middlewares/auth');

router.post("/login", UserController.login)

router.use(authenticate)
router.post("/products", ProductController.create)
router.get("/products", ProductController.read)
router.get("/products/:id",ProductController.readOne)
router.put("/products/:id", ProductController.update)
router.delete("/products/:id", ProductController.delete)


module.exports = router