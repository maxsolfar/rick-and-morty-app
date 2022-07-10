const { DataTypes, UUIDV4 } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("character", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey:true,
      defaultValue: UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    species: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("Female","Male","Genderless","unknown"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Alive","Dead","unknown"),
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },{timestamps: false});
};