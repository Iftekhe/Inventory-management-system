const express = require("express")
const productRouter = express.Router();
//require("../config/database");
const passport = require('passport');
require('../config/passport');
// Update your productRouter in routes.js
const productController = require('../controller/productController');
const isAdmin = require('../middleware/isAdmin');
const isAdminOrEmployee = require('../middleware/isAdminOrEmployee');

const app = express();
app.use(passport.initialize());

const multer = require("multer");
const path = require('path');


//define storage

const storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null, path.join(__dirname, '../uploads/postImage'),function(error,success){
      if(error){
        console.log(error)
      }
    })

  },
  filename:function(req,file,cb){
    const name = Date.now()+'-'+file.originalname;
    cb(null,name,function(error,success){
      if(error){
        console.log(error)
      }
    })

  }
})

const upload = multer({storage: storage})

//product home route
productRouter.get('/', isAdminOrEmployee, productController.productHome)

//add product route -- post
productRouter.post('/addProduct', isAdmin, productController.addProductPost);

// Define the route to get all products with category
productRouter.get('/AllProducts', isAdmin, productController.getAllProducts);

// get products by id
productRouter.get('/AllProducts/:id', isAdminOrEmployee, productController.getProductsById);

// Define the route to update a product by name
productRouter.put('/updateProduct/:id',  isAdmin, productController.updateProductById);

// Define the route to delete a product by name
productRouter.delete('/deleteProduct/:id', isAdmin, productController.deleteProductById);

// Define the route to assign a product to an employee
//productRouter.post('/assignProductToEmployee', productController.assignProductToEmployee);

// Define the route to request a product for approval
// productRouter.post('/requestProductApproval', productController.requestProductApproval);









//catagpory

// //catagory route -- POST
// productRouter.post('/addCategory' , productController.addCategoryPost)

// // Define the route to get all categories with products
// productRouter.get('/categories', productController.getAllCategories);

// // Define the route to get all products in the "food" category
// productRouter.get('/products/food', productController.getAllProductsInCategory);

// // Define the route to get all products based on the provided category name
// productRouter.post('/products/category', productController.getAllProductsInCategoryPost);

module.exports = productRouter;