const Transfer = require('../models/transfer.model'); // Adjust the path as needed

exports.addTransfer = async (req, res) => {
  try {
    const {
      productId,
      fromUserId,
      toUserId,
      fromBranchId,
      toBranchId,
      transferDate,
      requestedBy,
      approvedBy,
      approvalDate,
      status
    } = req.body;

    // Validate the request body
    if (!productId || !fromUserId || !fromBranchId || !transferDate || !status) {
      return res.status(400).send("Required fields are missing: productId, fromUserId, fromBranchId, transferDate, status");
    }

    // Validate status value
    const validStatuses = ["pending", "approved", "rejected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).send("Invalid status value");
    }

    // Create a new transfer record
    const newTransfer = new Transfer({
      productId,
      fromUserId,
      toUserId,
      fromBranchId,
      toBranchId,
      transferDate,
      requestedBy,
      approvedBy,
      approvalDate,
      status 
    });

    // Save the new transfer record to the database
    await newTransfer.save();

    // Send a success response
    res.status(201).send("Transfer record added successfully");
  } catch (error) {
    // Handle errors
    res.status(500).send(error.message);
  }
};



exports.getTransfers = async (req, res) => {
  try {
    // Query transfer records from the database and populate all referenced fields
    const transfers = await Transfer.find()
      .populate('productId')
      .populate('fromUserId')
      .populate('toUserId')
      .populate('fromBranchId')
      .populate('toBranchId')
      .populate('requestedBy')
      .populate('approvedBy');

    // Send the transfer records as a response
    res.json(transfers);
  } catch (error) {
    // Handle errors
    res.status(500).send(error.message);
  }
};
