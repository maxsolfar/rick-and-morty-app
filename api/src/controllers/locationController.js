const axios = require("axios");
const { Location } = require("../db");

const { URL_LOCATIONS } = require("./utils/apiAccess");

/*
 * ADD LOCATIONS DB
 */

const addLocationsDB = async () => {
  try {
    let locations = [];

    const locationsAPI = await axios.get(URL_LOCATIONS);
        locationsAPI &&
        locationsAPI.data.results?.map((location) => {
            locations.push({
            name: location.name,
        });
    });
      
    const locationsDB = await Location.findAll();

    if (locationsDB.length === 0) {
      await Location.bulkCreate(locations);
    }

  } catch (error) {
    console.log(`Can't add locations to DB: ${error}`);
  }
};

/*
? GET ALL LOCATIONS FROM DB 
*/

const getAllLocations = async (req, res, next) => {
  try {

    const allLocations= await Location.findAll();
    const locations = allLocations?.map(location => {
      return {
          name: location.name,
      }
    });
    res.send(locations);
  } catch (error) {
    res.status(400).send(`Can't get All Locations: ${error}`);
  }
};

module.exports = {
  getAllLocations,
  addLocationsDB,
};