const axios = require("axios");
const { Character, Episode } = require("../db");

const { URL_CHARACTERS } = require("./utils/apiAccess");

/*
? GET ALL CHARACTERS FROM API & DB 
*/

const getAllCharacters = async (req, res, next) => {
  const { name } = req.query;
  if (name) {
    try {
      const dataName = await getCharacterByName(name);
      res.send(dataName);
    } catch (error) {
      res.status(404).send(`The Character: ${name} doesn't exist : ${error}`);
    }
  } else {
    try {
      await Promise.all([getApiData(), getDBData()]).then((data) => {
        const [dataApi, dataDB] = data;

        if (!dataDB || dataDB.length === 0) {
          res.status(200).send(dataApi);
        } else if (!dataApi || dataApi.length === 0) {
          res.status(200).send(dataDB);
        } else {
          const allCharacters = [...dataDB, ...dataApi];
          res.status(200).send(allCharacters);
        }
      });
    } catch (error) {
      res.status(400).send(`Can't get All Characters: ${error}`);
    }
  }
};

/*
? GET CHARACTERS BY NAME FROM API 
*/

const getCharacterByName = async (name) => {
  try {
    const DBData = await getDBData();
    const APIData = await getApiData();

    const dataDBFilter = DBData?.filter((data) =>
      data.name.toLowerCase().includes(name.toLowerCase())
    );

    const dataAPIFilter = APIData?.filter((data) =>
      data.name.toLowerCase().includes(name.toLowerCase())
    );

    return [...dataDBFilter, ...dataAPIFilter];
  } catch (error) {
    throw "Error searching a character by name";
  }
}; 

/*
? GET CHARACTER DETAIL FROM DB OR API 
*/

const getCharacterDetail = async (req, res, next) => {

  const { idCharacter } = req.params;

  try {
    if(idCharacter.length > 8){
        let DBData = await Character.findByPk(idCharacter,{
          include: [
            {
              model: Episode,
              attributes: ["name"],
              through: {
                attributes: [],
              },
            },
          ],
        });
        return res.status(200).send(DBData);
   /*    const DbData = await getDBData();
      const findDB = DbData?.find((data) => data.id === idCharacter);
      res.status(200).send(findDB); */
    }
    else{
      const APIData = await axios.get(`${URL_CHARACTERS}${idCharacter}`);

      let arrayEpisodes = [];
      await Promise.all(APIData.data.episode.map(async(episode) => {
      arrayEpisodes.push((await axios.get(episode)).data.name);}))

      const Character = {
        id: APIData.data.id,
        name: APIData.data.name,
        species: APIData.data.species,
        origin: APIData.data.origin.name,
        image: APIData.data.image,
        gender: APIData.data.gender,
        status: APIData.data.status,
        episodes: [...arrayEpisodes]
      };
    
      res.status(200).send(Character);

    }
  } catch (error) {
    res.status(400).send({ error: "The Character doesn't exist" });
  }
};

const getApiData = async () => {
  /*Number of games requested*/
  const nRequest = 96;
  let apiCharacters = [];
  let index = 1;
  while (apiCharacters.length < nRequest) {
    const APIData = await axios.get(`${URL_CHARACTERS}?page=${index}`);
    APIData &&
      APIData.data.results?.map((character) => {
        apiCharacters.push({
          id: character.id,
          name: character.name,
          species: character.species,
          origin: character.origin.name,
          image: character.image,
          created: false,
        });
      })
    index++;
  }
  return apiCharacters;
};

const getDBData = async () => {
  let DBData = await Character.findAll({
    include: [
      {
        model: Episode,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  });
  return DBData;
};


const addCharacter = async (req, res, next) => {
  const { name, species, origin, image, episodes, gender, status } = req.body;

  if (!name || !species || !origin || !episodes) {
    res.status(400).send({ error: "Missing data in the request" });
  }

  try {
    const newCharacter = await Character.create({
      name,
      species,
      origin,
      gender,
      status,
      image:
        image ||
        "https://rickandmortyapi.com/api/character/avatar/19.jpeg",
    });

    const episodeDb = await Episode.findAll({
      where: { name: episodes },
    });

    newCharacter.addEpisode(episodeDb);
    res.send(newCharacter);
  } catch (error) {
    res.status(400).send({ error: `Can't add new character ${error}` });
  }
};

const deleteCharacter = async (req, res, next) => {
  try {
    const { idCharacter } = req.params;
    const findCharacter = await Character.findByPk(idCharacter);
    if (findCharacter) {
      await findCharacter.destroy();
      return res.status(200).send("Character was Delete");
    }
  } catch (error) {
    res.status(400).send({ error: "Can't delete the character" });
  }
};

module.exports = {
  getAllCharacters,
  addCharacter,
  getCharacterDetail,
  deleteCharacter
};
