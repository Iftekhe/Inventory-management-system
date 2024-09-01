const express = require("express");
const assignmnetRouter = express.Router();
const assignmentController = require("../controller/assignmentController");

// const app = express();
// app.use(passport.initialize());

const isAdmin = require('../middleware/isAdmin');

const verifyToken = require('../middleware/verifyToken');


assignmnetRouter.post("/addAssignment",  assignmentController.addAssignment);

assignmnetRouter.post("/requestAssignment",  assignmentController.requestAssignment);

assignmnetRouter.get("/getAllAssignment",  assignmentController.getAssignments);

assignmnetRouter.get("/assignments/:userId", assignmentController.getUserAssignments);

assignmnetRouter.put("/assignments/return/:assignmentId", assignmentController.returnAssignment);


assignmnetRouter.get("/returnedAssignments",  assignmentController.getReturnedAssignments);



assignmnetRouter.get("/admin/productRequests", assignmentController.getProductRequests);


assignmnetRouter.post("/employee/requestProduct",   assignmentController.requestProduct);


assignmnetRouter.put("/admin/approveRequest/:assignmentId",  assignmentController.approveRequest);


assignmnetRouter.post("/admin/rejectRequest/:requestId",  assignmentController.rejectRequest);



module.exports = assignmnetRouter;