const { Router } = require("express");

const characterRouter = Router();

const { getAllCharacters, addCharacter, getCharacterDetail, deleteCharacter } = require("../controllers/characterController");


characterRouter.get("/", getAllCharacters);
characterRouter.get("/:idCharacter", getCharacterDetail);
characterRouter.post("/", addCharacter);
characterRouter.delete("/:idCharacter", deleteCharacter);

module.exports = characterRouter;