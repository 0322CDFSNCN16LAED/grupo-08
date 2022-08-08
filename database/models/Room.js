const sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  let alias = "Room";
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
    tableName: "Rooms",
    timestamps: false,
  };

  // definimos la constante modelo.
  const Room = sequelize.define(alias, cols, config);

  // creamos la relacion con la tabla

  Room.associate = function (models) {
    Room.belongsToMany(models.Product, {
      as: "Products", // el alias de la tabla
      through: "RoomsProducts", // tabla que rompe la relacion
      foreignKey: "roomId", // ojo aca verlo
      otherKey: "productId", // la otra clave foranea
      timestamps: false,
    });
  };

  return Room;
};