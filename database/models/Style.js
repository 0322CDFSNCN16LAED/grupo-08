const sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  let alias = "Style";
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
    tableName: "Styles",
    timestamps: false,
  };

  // definimos la constante modelo.
  const Style = sequelize.define(alias, cols, config);

  // creamos la relacion con la tabla

  Style.associate = function (models) {
    Style.hasMany(models.Product, {
      as: "Products", // el alias de la tabla
      foreignKey: "styleId", // ojo aca verlo
      timestamps: false,
    });
  };

  return Style;
};
