const sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  let alias = "RoomProduct";
  // configuramos las columnas
  let cols = {
    roomId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  };

  // asignamos en nombre de la tabla en la DB
  let config = {
    tableName: "RoomsProducts",
    timestamps: true,
    paranoid: true,
  };

  // definimos la constante modelo.
  const RoomsProducts = sequelize.define(alias, cols, config);

  // creamos la relacion con la tabla

  RoomsProducts.associate = function (models) {
    RoomsProducts.belongsTo(models.Room, {
      as: "Rooms", // el alias de la relación
      foreignKey: "roomId",
    });
    RoomsProducts.belongsTo(models.Product, {
      as: "Products", // el alias de la relación
      foreignKey: "productId",
    });
  };

  return RoomsProducts;
};
