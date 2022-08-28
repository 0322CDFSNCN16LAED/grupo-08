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
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    styleId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(25, 2),
      allowNull: false,
    },
    sale: {
      type: DataTypes.DECIMAL(1, 2),
    },
    installmentId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    freeDelivery: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    brandId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    measurements: {
      type: DataTypes.STRING,
    },
    colourId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    details: {
      type: DataTypes.STRING,
    },
    extraInfo: {
      type: DataTypes.STRING,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };

  // asignamos en nombre de la tabla en la DB
  let config = {
    tableName: "Products",
    timestamps: true,
    paranoid: true,
  };

  // definimos la constante modelo.
  const Product = sequelize.define(alias, cols, config);

  // creamos la relacion con la tabla

  Product.associate = function (models) {
    Product.belongsTo(models.Category, {
      as: "Category", // el alias de la relacion
      foreignKey: "categoryId",
    });
    Product.belongsTo(models.Colour, {
      as: "Colour", // el alias de la relacion
      foreignKey: "colourId",
    });
    Product.belongsTo(models.Brand, {
      as: "Brand", // el alias de la relacion
      foreignKey: "brandId",
    });
    Product.belongsTo(models.Installment, {
      as: "Installment", // el alias de la relacion
      foreignKey: "installmentId",
    });
    Product.belongsTo(models.Style, {
      as: "Style", // el alias de la relacion
      foreignKey: "styleId",
    });
    // muchos a muchos
    Product.belongsToMany(models.Room, {
      as: "Rooms", // el alias de la tabla
      through: "RoomsProducts",
      foreignKey: "productId",
      otherKey: "roomId",
      onDelete: "cascade",
    });
    Product.belongsToMany(models.Order, {
      as: "Orders", // deberia ser el plural
      through: "OrdersProducts",
      foreignKey: "productId",
      otherKey: "orderId",
      onDelete: "cascade",
    });
  };

  return Product;
};
