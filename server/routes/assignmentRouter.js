const express = require("express");
const assignmnetRouter = express.Router();
const assignmentController = require("../controller/assignmentController");

// const app = express();
// app.use(passport.initialize());

const isAdmin = require('../middleware/isAdmin');

const verifyToken = require('../middleware/verifyToken');


assignmnetRouter.post("/addAssignment", isAdmin, assignmentController.addAssignment);

assignmnetRouter.get("/getAllAssignment", isAdmin, assignmentController.getAssignments);

assignmnetRouter.get("/admin/productRequests", assignmentController.getProductRequests);


assignmnetRouter.post("/employee/requestProduct",   assignmentController.requestProduct);


assignmnetRouter.post("/admin/approveRequest/:requestId",  assignmentController.approveRequest);


assignmnetRouter.post("/admin/rejectRequest/:requestId",  assignmentController.rejectRequest);



module.exports = assignmnetRouter;