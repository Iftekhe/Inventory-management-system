const express = require("express");
const InventoryRouter = express.Router();
const inventoryController = require("../controller/inventoryController");
// const passport = require('passport');
// require('../config/passport');
//const jwt = require('jsonwebtoken');

// const app = express();
// app.use(passport.initialize());

const isAdmin = require('../middleware/isAdmin');

// add inventory route - POST
InventoryRouter.post("/addInventory", isAdmin, inventoryController.addInventory);

// get all inventory route - POST
InventoryRouter.get("/getAllInventory", isAdmin, inventoryController.getAllInventory);

// passport.authenticate('jwt', { session: false }), isAdmin,

module.exports = InventoryRouter;