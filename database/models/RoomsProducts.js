const sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  let alias = "RoomProduct";
  // configuramos las columnas
  let cols = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
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
    timestamps: false,
  };

  // definimos la constante modelo.
  const RoomsProducts = sequelize.define(alias, cols, config);

  // creamos la relacion con la tabla

  RoomsProducts.associate = function (models) {
    RoomsProducts.belongsTo(models.Room, {
      as: "Rooms", // el alias de la tabla
      foreignKey: "roomId",
      timestamps: false,
    });
    RoomsProducts.belongsTo(models.Product, {
      as: "Products", // el alias de la tabla
      foreignKey: "productId",
      timestamps: false,
    });
  };

  return RoomsProducts;
};
