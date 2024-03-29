const sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  let alias = "Brand";
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
    tableName: "Brands",
    timestamps: true,
    paranoid: true,
  };

  // definimos la constante modelo.
  const Brand = sequelize.define(alias, cols, config);

  // creamos la relacion con la tabla

  Brand.associate = function (models) {
    Brand.hasMany(models.Product, {
      as: "Products", // el alias de la relacion
      foreignKey: "brandId", 
    });
  };

  return Brand;
};