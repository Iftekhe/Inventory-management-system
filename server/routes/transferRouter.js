const express = require("express");
const transferRouter = express.Router();
const transferController = require("../controller/transferController");

// const app = express();
// app.use(passport.initialize());

const isAdmin = require('../middleware/isAdmin');

transferRouter.post("/addTransfer", isAdmin, transferController.addTransfer);

transferRouter.get("/getTransfers", isAdmin, transferController.getTransfers);


module.exports = transferRouter;