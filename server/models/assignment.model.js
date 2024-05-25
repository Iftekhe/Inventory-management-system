const mongoose = require("mongoose");

const assignmentSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  assignedDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  returnedDate: {
    type: Date,
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  currentStatus: {
    type: String,
    enum: ["assigned", "returned", "in_transfer"],
    required: true,
  },
});

const Assignment = mongoose.model("Assignment", assignmentSchema);

module.exports = Assignment;
