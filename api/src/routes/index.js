const { Router } = require("express");

const characterRouter = require("./characterRoutes");
const episodeRouter = require("./episodeRoutes");
const locationRouter = require("./locationRoutes");

const router = Router();

// Configurar los routers

router.use("/characters", characterRouter);
router.use("/episodes", episodeRouter);
router.use("/locations", locationRouter);

module.exports = router;
