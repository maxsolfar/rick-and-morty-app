const { Router } = require("express");

const episodeRouter = Router();

const { getAllEpisodes } = require("../controllers/episodeController");


episodeRouter.get("/", getAllEpisodes);


module.exports = episodeRouter;