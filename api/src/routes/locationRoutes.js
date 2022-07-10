const { Router } = require("express");

const locationRouter = Router();

const { getAllLocations } = require("../controllers/locationController");


locationRouter.get("/", getAllLocations);


module.exports = locationRouter;