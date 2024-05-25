const express = require("express")
const locationRouter = express.Router();
const passport = require('passport');

const locationController = require('../controller/locationController');

//post location info
locationRouter.post("/location", passport.authenticate('jwt', { session: false }), locationController.branchLocation);

//getUserWithLocation
locationRouter.get("/location/:userId", passport.authenticate('jwt', { session: false }), locationController.getUserWithLocation);


module.exports = locationRouter;
