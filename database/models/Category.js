const sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  let alias = "Category";
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
    tableName: "Categories",
    timestamps: true,
    paranoid: true,
  };

  // definimos la constante modelo.
  const Category = sequelize.define(alias, cols, config);

  // creamos la relacion con la tabla

  Category.associate = function (models) {
    Category.hasMany(models.Product, {
      as: "Products", // el alias de la relacion
      foreignKey: "categoryId", 
    });
  };

  return Category;
};
