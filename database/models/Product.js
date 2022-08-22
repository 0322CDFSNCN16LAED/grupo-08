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
    },
    brandId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
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
      as: "Category", // el alias de la relacion
      foreignKey: "categoryId",
      timestamps: false,
    });
    Product.belongsTo(models.Colour, {
      as: "Colour", // el alias de la relacion
      foreignKey: "colourId",
      timestamps: false,
    });
    Product.belongsTo(models.Brand, {
      as: "Brand", // el alias de la relacion
      foreignKey: "brandId",
      timestamps: false,
    });
    Product.belongsTo(models.Installment, {
      as: "Installment", // el alias de la relacion
      foreignKey: "installmentId",
      timestamps: false,
    });
    Product.belongsTo(models.Style, {
      as: "Style", // el alias de la relacion
      foreignKey: "styleId",
      timestamps: false,
    });
    // muchos a muchos
    Product.belongsToMany(models.Room, {
      as: "Rooms", // el alias de la tabla
      through: "RoomsProducts",
      foreignKey: "productId",
      otherKey: "roomId",
      timestamps: false,
      onDelete: "cascade",
    });
    Product.belongsToMany(models.Order, {
      as: "Orders", // deberia ser el plural
      through: "OrdersProducts",
      foreignKey: "productId",
      otherKey: "orderId",
      timestamps: false,
      onDelete: "cascade",
    });
  };

  return Product;
};
