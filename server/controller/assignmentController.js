const Assignment = require('../models/assignment.model'); 
const Inventory = require('../models/inventory.model'); 

exports.addAssignment = async (req, res) => {
  try {
    const { productId, employeeId, assignedDate, returnedDate, branchId, currentStatus, quantity } = req.body;

    // Validate the request body
    // if (!productId || !employeeId || !branchId || !currentStatus || !quantity) {
    //   return res.status(400).send("Required fields are missing: productId, employeeId, branchId, currentStatus, quantity");
    // }

    // Validate currentStatus value
    const validStatuses = ["assigned", "returned", "in_transfer"];
    if (!validStatuses.includes(currentStatus)) {
      return res.status(400).send("Invalid currentStatus value");
    }

    if (currentStatus === "assigned") {
      // Check if the product exists in inventory and has sufficient quantity
      const inventoryRecord = await Inventory.findOne({ productId, locationId: branchId });

      if (!inventoryRecord || inventoryRecord.quantity < quantity) {
        return res.status(400).send("Insufficient product quantity available in inventory");
      }

      // Create a new assignment record
      const newAssignment = new Assignment({
        productId,
        employeeId,
        assignedDate,
        returnedDate,
        branchId,
        currentStatus,
        quantity,
      });

      // Save the new assignment record to the database
      await newAssignment.save();

      // Update the inventory
      inventoryRecord.quantity -= quantity;
      if (inventoryRecord.quantity <= 0) {
        await Inventory.deleteOne({ _id: inventoryRecord._id });
      } else {
        await inventoryRecord.save();
      }
    } else if (currentStatus === "returned") {
      // Create a new assignment record
      const newAssignment = new Assignment({
        productId,
        employeeId,
        assignedDate,
        returnedDate: new Date(),
        branchId,
        currentStatus,
        quantity,
      });

      // Save the new assignment record to the database
      await newAssignment.save();

      // Update the inventory
      const inventoryRecord = await Inventory.findOne({ productId, locationId: branchId });
      if (inventoryRecord) {
        inventoryRecord.quantity += quantity;
        await inventoryRecord.save();
      } else {
        const newInventoryRecord = new Inventory({
          productId,
          locationId: branchId,
          quantity,
        });
        await newInventoryRecord.save();
      }
    }

    // Send a success response
    res.status(201).send("Assignment record added successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};





exports.requestAssignment = async (req, res) => {
  try {
    const { productId, assignedDate, returnedDate, branchId } = req.body;

    // Get employeeId from token
    const existingToken = req.headers.authorization;
    const decodedToken = decodeToken(existingToken);
    const employeeId = decodedToken.id; // Assuming userId is the correct field in your token

    // Create a new assignment record with pending status
    const newAssignment = new Assignment({
      productId,
      employeeId,
      assignedDate,
      returnedDate,
      branchId,
      currentStatus: "pending", // Set status to pending
      quantity: 1, // Assuming quantity is always 1 for pending requests
    });

    // Save the new assignment record to the database
    await newAssignment.save();

    // Send a success response
    res.status(201).send("Assignment record added successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const decodeToken = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (error) {
    console.error('Error decoding token:', error);
    return {};
  }
};





//get all assignmnet --GET
exports.getAssignments = async (req, res) => {
  try {
    // Query assignment records from the database
    const assignments = await Assignment.find()
    .populate('productId')
    .populate('employeeId')
    .populate('branchId')

    // Send the assignment records as a response
    res.json(assignments);
  } catch (error) {
    // Handle errors
    res.status(500).send(error.message);
  }
};


exports.getUserAssignments = async (req, res) => {
  try {
    const userId = req.params.userId;
    const assignments = await Assignment.find({ employeeId: userId })
      .populate("productId")
      .populate("branchId")
      .populate("employeeId");
    
    res.json(assignments);
  } catch (error) {
    console.error("Error fetching user assignments:", error);
    res.status(500).send("Error retrieving user assignments");
  }
};


exports.returnAssignment = async (req, res) => {
  try {
    const assignmentId = req.params.assignmentId;

    // Find the assignment by ID
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).send("Assignment not found");
    }

    // Update the assignment's status to returned
    assignment.currentStatus = "returned";
    assignment.returnedDate = new Date();

    // Save the updated assignment
    await assignment.save();

    // Send a success response
    res.status(200).send("Assignment returned successfully");
  } catch (error) {
    console.error("Error returning assignment:", error);
    res.status(500).send("Error returning assignment");
  }
};



exports.getReturnedAssignments = async (req, res) => {
  try {
    const returnedAssignments = await Assignment.find({ currentStatus: "returned" })
      .populate("productId")
      .populate("branchId");

    res.json(returnedAssignments);
  } catch (error) {
    console.error("Error fetching returned assignments:", error);
    res.status(500).send("Error fetching returned assignments");
  }
};


exports.requestProduct = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const employeeId = req.body.employeeId;
console.log(employeeId)
    // Check if the requested quantity is available in the inventory
    const inventory = await Inventory.findOne({ productId, status: 'approved' });
    if (!inventory || inventory.quantity < quantity) {
      return res.status(400).json({ message: 'Insufficient product quantity available' });
    }

    // Create a new Assignment entry with status 'pending'
    const assignment = new Assignment({
      productId,
      employeeId,
      quantity,
      currentStatus: 'pending'
    });
    await assignment.save();

    res.status(201).json({ message: 'Product request sent successfully. Pending approval from admin.', assignment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}




// exports.requestProduct = async (req, res) => {
//   try {
//       const { productId, quantity, employeeId } = req.body;

//       // Validate `branchId` and `currentStatus`
//       if (!req.body.branchId) {
//           return res.status(400).json({ message: 'BranchId is required.' });
//       }

//       const validStatuses = ['pending', 'approved']; // Define valid status values
//       const currentStatus = 'pending'; // Set default status to 'pending'
//       if (!validStatuses.includes(currentStatus)) {
//           return res.status(400).json({ message: 'Invalid value for currentStatus.' });
//       }

//       // Create a new Assignment entry
//       const assignment = new Assignment({
//           productId,
//           employeeId, // Assuming `employeeId` is properly provided in the request body
//           quantity,
//           branchId: req.body.branchId, // Assuming `branchId` is properly provided in the request body
//           currentStatus // Assign the validated currentStatus
//       });
//       await assignment.save();

//       res.status(201).json({ message: 'Product request sent successfully. Pending approval from admin.', assignment });
//   } catch (error) {
//       res.status(400).json({ message: error.message });
//   }
// };


// exports.approveRequest = async (req, res) => {
//   try {
//     const inventoryRequest = await Inventory.findById(req.params.requestId);
//     if (!inventoryRequest) return res.status(404).send('Request not found');
//     if (inventoryRequest.status !== 'pending') return res.status(400).send('Request is not pending approval');

//     const product = await Product.findById(inventoryRequest.productId);
//     if (!product) return res.status(404).send('Product not found');
//     if (inventoryRequest.quantity > product.quantity) return res.status(400).send('Insufficient product quantity available');

//     // Deduct quantity from the product inventory
//     product.quantity -= inventoryRequest.quantity;
//     await product.save();

//     // Update inventory request status to approved
//     inventoryRequest.status = 'approved';
//     await inventoryRequest.save();

//     // Create a new assignment record
//     const assignment = new Assignment({
//       productId: inventoryRequest.productId,
//       employeeId: inventoryRequest.employeeId,
//       branchId: inventoryRequest.locationId,
//       quantity: inventoryRequest.quantity,
//       currentStatus: 'assigned',
//     });

//     await assignment.save();

//     res.json({ message: 'Request approved successfully.', assignment });
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// }




// Controller to handle approval of returned assignments
exports.approveRequest = async (req, res) => {
  try {
    const { action } = req.body;
    const assignmentId = req.params.assignmentId;

    // Find the assignment by ID
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) return res.status(404).send("Assignment not found");

    if (action === "approve") {
      // Update the inventory
      const inventoryRecord = await Inventory.findOne({ productId: assignment.productId, locationId: assignment.branchId });
      if (inventoryRecord) {
        inventoryRecord.quantity += assignment.quantity;
        inventoryRecord.status = "approved";
        await inventoryRecord.save();
      } else {
        const newInventoryRecord = new Inventory({
          productId: assignment.productId,
          locationId: assignment.branchId,
          quantity: assignment.quantity,
          status: "approved",
        });
        await newInventoryRecord.save();
      }

      // Remove the assignment from the assignments collection
      await Assignment.findByIdAndDelete(assignmentId);
    } else if (action === "reject") {
      // Update the assignment's status to assigned again
      assignment.currentStatus = "assigned";
      await assignment.save();
    }

    res.status(200).json({ message: `Assignment ${action}d successfully` });
  } catch (error) {
    console.error(`Error ${action} assignment:`, error);
    res.status(500).send(`Error ${action} assignment`);
  }
};




exports.getProductRequests = async (req, res) => {
  try {
    const requests = await Inventory.find({ status: 'pending' }).populate('productId employeeId', 'name');
    res.json(requests);
  } catch (error) {
    res.status(500).send(error.message);
  }
}




exports.rejectRequest = async (req, res) => {
  try {
    const inventoryRequest = await Inventory.findById(req.params.requestId);
    if (!inventoryRequest) return res.status(404).send('Request not found');
    if (inventoryRequest.status !== 'pending') return res.status(400).send('Request is not pending approval');

    await inventoryRequest.remove();
    res.json({ message: 'Request rejected successfully.' });
  } catch (error) {
    res.status(500).send(error.message);
  }
}
