const server = require("./src/app.js");
const { conn } = require("./src/db.js");

const { addEpisodesDB } = require("./src/controllers/episodeController");
const { addLocationsDB } = require("./src/controllers/locationController");

// Para la precarga de nuestra DB cuando se levanta el server, se puede ejecutar la funcion getEpisodes() que deberán armarla ustedes. Dicha función nos cargaría todos los personajes en nuestra DB una vez que se inicia el servidor. Tener en cuenta que como es un pedido a la API, debería ser asíncrona.

conn.sync({ force: false }).then(() => {
  // getEpisodes();
  addEpisodesDB();
  addLocationsDB();

  server.listen(process.env.DB_PORT, () => {
    console.log(`Listening at ${process.env.DB_PORT}`); // eslint-disable-line no-console
  });
});
