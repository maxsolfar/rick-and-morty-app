const axios = require("axios");
const { Episode } = require("../db");

const { URL_EPISODES } = require("./utils/apiAccess");

/*
 * ADD EPISODES DB
 */

const addEpisodesDB = async () => {
  try {
    const totalEpisodes = (await axios.get(URL_EPISODES)).data.info.count;
    //console.log(totalEpisodes);
    let episodes = [];
    let index = 1;
    while (episodes.length < totalEpisodes) {
      const episodesAPI = await axios.get(`${URL_EPISODES}?page=${index}`);
      episodesAPI &&
        episodesAPI.data.results?.map((episode) => {
          episodes.push({
            name: episode.name,
          });
        });

      index++;
    }

    const episodesDB = await Episode.findAll();

    if (episodesDB.length === 0) {
      await Episode.bulkCreate(episodes);
    }
    //onsole.log(episodes);
  } catch (error) {
    console.log(`Can't add episodes to DB: ${error}`);
  }
};

/*
? GET ALL EPISODES FROM DB 
*/

const getAllEpisodes = async (req, res, next) => {
  try {
    /* await addGenresToDB(); */
    const allEpisodes = await Episode.findAll();
    const episodes = allEpisodes?.map(episode => {
      return {
          name: episode.name,
      }
    });
    res.send(episodes);
  } catch (error) {
    res.status(400).send(`Can't get All Episodes: ${error}`);
  }
};

module.exports = {
  getAllEpisodes,
  addEpisodesDB,
};
