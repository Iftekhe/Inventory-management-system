const Inventory = require('../models/inventory.model'); // Adjust the path as needed



//add invnetory --POST
exports.addInventory = async (req, res) => {
  try {
    const { productId, locationId, quantity } = req.body;

    // Validate the request body
    if (!productId || !locationId || quantity == null) {
      return res.status(400).send("All fields are required: productId, locationId, quantity");
    }

    // Create a new inventory record
    const newInventory = new Inventory({
      productId,
      locationId,
      quantity,
    });

    // Save the new inventory record to the database
    await newInventory.save();

    // Send a success response
    res.status(201).send("Inventory record added successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};


//get All Inventory -- GET

// exports.getAllInventory = async (req, res) => {
//     try {
//         // Fetch all inventory items
//         const inventoryItems = await Inventory.find()
//             // .populate('productId')
//             // .populate('locationId');

//         // Return the fetched inventory items
//         res.json(inventoryItems);
//     } catch (error) {
//         // Handle errors
//         console.error("Error fetching inventory:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };


// Get all products with associated category
exports.getAllInventory = async (req, res) => {
  try {
    const inventoryItems = await Inventory.find()
      .populate('productId')
      .populate('locationId');
    res.json(inventoryItems);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving products with category');
  }
};
