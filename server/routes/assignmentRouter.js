const express = require("express");
const assignmnetRouter = express.Router();
const assignmentController = require("../controller/assignmentController");

// const app = express();
// app.use(passport.initialize());

const isAdmin = require('../middleware/isAdmin');

assignmnetRouter.post("/addAssignment", isAdmin, assignmentController.addAssignment);

assignmnetRouter.get("/getAllAssignment", isAdmin, assignmentController.getAssignments);


module.exports = assignmnetRouter;