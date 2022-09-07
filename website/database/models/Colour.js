const sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  let alias = "Colour";
  // configuramos las columnas
  let cols = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };

  // asignamos en nombre de la tabla en la DB
  let config = {
    tableName: "Colours",
    timestamps: true,
    paranoid: true,
  };

  // definimos la constante modelo.
  const Colour = sequelize.define(alias, cols, config);

  // creamos la relacion con la tabla

  Colour.associate = function (models) {
    Colour.hasMany(models.Product, {
      as: "Products", // el alias de la relación
      foreignKey: "colourId", 
    });
  };

  return Colour;
};