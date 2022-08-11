const sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  let alias = "Order";
  // configuramos las columnas
  let cols = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    orderTotal: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  };

  // asignamos en nombre de la tabla en la DB
  let config = {
    tableName: "Orders",
    timestamps: false,
  };

  // definimos la constante modelo.
  const Order = sequelize.define(alias, cols, config);

  // creamos la relacion con la tabla
  // esta es la relacion con usuarios
  Order.associate = function (models) {
    Order.belongsTo(models.User, {
      as: "User", // el alias de la tabla
      foreignKey: "userId", // ojo aca verlo
      timestamps: false,
    });

    Order.belongsToMany(models.Product, {
      as: "Products",
      through: "OrdersProducts",
      foreignKey: "orderId",
      otherKey: "productId",
      timestamps: false,
    });
  };

  return Order;
};