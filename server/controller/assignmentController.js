const Assignment = require('../models/assignment.model'); // Adjust the path as needed

exports.addAssignment = async (req, res) => {
  try {
    const { productId, employeeId, assignedDate, returnedDate, branchId, currentStatus } = req.body;

    // Validate the request body
    if (!productId || !employeeId || !branchId || !currentStatus) {
      return res.status(400).send("Required fields are missing: productId, employeeId, branchId, currentStatus");
    }

    // Validate currentStatus value
    const validStatuses = ["assigned", "returned", "in_transfer"];
    if (!validStatuses.includes(currentStatus)) {
      return res.status(400).send("Invalid currentStatus value");
    }

    // Create a new assignment record
    const newAssignment = new Assignment({
      productId,
      employeeId,
      assignedDate,
      returnedDate,
      branchId,
      currentStatus,
    });

    // Save the new assignment record to the database
    await newAssignment.save();

    // Send a success response
    res.status(201).send("Assignment record added successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};


//get all assignmnet --GET
exports.getAssignments = async (req, res) => {
  try {
    // Query assignment records from the database
    const assignments = await Assignment.find()
    .populate('productId')
    .populate('employeeId');

    // Send the assignment records as a response
    res.json(assignments);
  } catch (error) {
    // Handle errors
    res.status(500).send(error.message);
  }
};
