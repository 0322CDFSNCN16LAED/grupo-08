const sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  let alias = "Address";
  // configuramos las columnas
  let cols = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
    },
    zipCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    
  };

  // asignamos en nombre de la tabla en la DB
  let config = {
    tableName: "Address",
    timestamps: true,
    paranoid: true,
  };

  // definimos la constante modelo.
  const Address = sequelize.define(alias, cols, config);

  // creamos la relacion con la tabla

  Address.associate = function (models) {
    Address.belongsTo(models.User, {
      as: "User", // el alias de la relacion 
      foreignKey: "userId",
    });
  };

  return Address;
};
