const mongoose = require("mongoose");

const inventorySchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  locationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0, // Ensure quantity is non-negative
  },
});

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
