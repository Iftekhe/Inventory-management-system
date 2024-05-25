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

exports.getAllInventory = async (req, res) => {
        try {
          // Parsing query parameters for filtering
          const { productId, locationId } = req.query;
    
          // Building filter criteria
          let filter = {};
          if (productId) filter.productId = productId;
          if (locationId) filter.locationId = locationId;
    
          // Fetching filtered inventory
          const inventory = await Inventory.find(filter)
            .populate('productId')
            .populate('locationId');
    
          // Sending response with inventory data
          res.json(inventory);
        } catch (error) {
          res.status(500).send(error.message);
        }
      }
