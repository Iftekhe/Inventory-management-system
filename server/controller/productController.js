const product = require("../models/product.model");



//product home
exports.productHome = (req, res) => {
  res.send("product home")
};


//add product --POST
exports.addProductPost = async (req,res)=> {
  try{
          const newProduct = new product({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            brand: req.body.brand,
            model: req.body.model, 
          })
          await newProduct.save()
          .then(() => res.send("product added successfully"))
          .catch((err) => console.log(err)); 
  }
  catch(error){
    res.status(400).send(error.message)
  }
}



// Get all products with associated category
exports.getAllProducts = async (req, res) => {
  try {
    const products = await product.find()
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving products with category');
  }
};


// Get all products by id --POST
exports.getProductsById =  (req, res) => {
  try {
    const id = req.params.id
     product.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving products with category');
  }
};


// Update a product by searching for it based on the productName
// exports.updateProductByName = async (req, res) => {
//   try {
//     const { productName, updatedData } = req.body;

//     // Use findOneAndUpdate
//     const updatedProduct = await product.findOneAndUpdate(
//       { productName },
//       updatedData,
//       { new: true, runValidators: true }
//     );

//     if (!updatedProduct) {
//       return res.status(404).send('Product not found');
//     }

//     res.json(updatedProduct);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error updating the product');
//   }
// };



exports.updateProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const updateData = {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      brand: req.body.brand,
      model: req.body.model,
    };

    const updatedProduct = await product.findByIdAndUpdate(productId, updateData, { new: true });

    if (!updatedProduct) {
      return res.status(404).send("Product not found");
    }

    res.send("Product updated successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};



// Delete a product by name
exports.deleteProductById = async (req, res) => {
  try {
    const id = req.params.id;

    // Check if the product with the given name exists
    const existingProduct = await product.findById(id);
    if (!existingProduct) {
      return res.status(404).send('Product not found');
    }
console.log("object")
    // Remove the product from the database
    await product.findByIdAndDelete(id);

    res.json({ message: 'Product deleted successfully' });
  
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting the product');
  }
};










//i think complexe



// Assign a product to an employee (admin only)
exports.assignProductToEmployee = async (req, res) => {
  try {
    const { adminId, employeeId, productId } = req.body;

    // Check if the requester is an admin
    const admin = await User.findByName(username);
    if (!admin || admin.role !== 'admin') {
      return res.status(403).send('Unauthorized: Only admins can assign products.');
    }

    // Check if the employee exists
    const employee = await User.findById(employeeId);
    if (!employee || employee.role !== 'employee') {
      return res.status(404).send('Employee not found');
    }

    // Create an assignment
    const assignment = new Assignment({
      user: employeeId,
      product: productId,
    });

    // Save the assignment to the database
    await assignment.save();

    res.json({ message: 'Product assigned to employee successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error assigning product to employee');
  }
};
