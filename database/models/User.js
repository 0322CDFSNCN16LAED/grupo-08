const sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  let alias = "User";
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
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
    },
    profilePic: {
      type: DataTypes.STRING,
    },
    userRoleId: {
      type: DataTypes.UUID,
      allowNull: false,
      //default: "d3c54232-8d0b-44de-ba8d-fe28cd2ad46f",
    },
  };

  // asignamos en nombre de la tabla en la DB
  let config = {
    tableName: "Users",
    timestamps: true,
    paranoid: true,
  };

  // definimos la constante modelo.
  const User = sequelize.define(alias, cols, config);

  // creamos la relacion con la tabla

  User.associate = function (models) {
    // relacion con userRol
    User.belongsTo(models.UserRole, {
      as: "userRole",
      foreignKey: "userRoleId",
    }),
      //relacion con address
      User.hasOne(models.Address, {
        as: "address",
        foreignKey: "userId",
      }),
      // relacion con order
      User.hasMany(models.Order, {
        as: "Orders", // el alias de la relación
        foreignKey: "userId", // ojo aca verlo
      });
  };

  return User;
};
