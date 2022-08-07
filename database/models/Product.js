const sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  let alias = "Product";
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
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.DECIMAL(25, 2),
    },
    measurements: {
      type: DataTypes.STRING,
    },
    freeDelivery: {
      type: DataTypes.INTEGER,
    },
    details: {
      type: DataTypes.STRING,
    },
    extraInfo: {
      type: DataTypes.STRING,
    },
    picture: {
      type: DataTypes.STRING,
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    colorId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    brandId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    installmentId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    styleId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  };

  // asignamos en nombre de la tabla en la DB
  let config = {
    tableName: "Products",
    timestamps: false,
  };

  // definimos la constante modelo.
  const Product = sequelize.define(alias, cols, config);

  // creamos la relacion con la tabla

  Product.associate = function (models) {
    Product.belongsTo(models.Category, {
      as: "Category", // el alias de la tabla
      foreignKey: "categoryId",
      timestamps: false,
    });
    Product.belongsTo(models.Colour, {
      as: "Colour", // el alias de la tabla
      foreignKey: "colorId",
      timestamps: false,
    });
    Product.belongsTo(models.Brand, {
      as: "Brand", // el alias de la tabla
      foreignKey: "brandId",
      timestamps: false,
    });
    Product.belongsTo(models.Installment, {
      as: "Installment", // el alias de la tabla
      foreignKey: "installmentId",
      timestamps: false,
    });
    Product.belongsTo(models.Style, {
      as: "Style", // el alias de la tabla
      foreignKey: "styleId",
      timestamps: false,
    });
    // muchos a muchos
    Product.belongsToMany(models.Room, {
      as: "Room", // el alias de la tabla
      through: "RoomsProducts",
      foreignKey: "productId",
      otherKey: "roomId",
      timestamps: false,
    });
    Product.belongsToMany(models.Order, {
      as: "Order", // el alias de la tabla
      through: "OrdersProducts",
      foreignKey: "productId",
      otherKey: "orderId",
      timestamps: false,
    });
  };

  return Product;
};
