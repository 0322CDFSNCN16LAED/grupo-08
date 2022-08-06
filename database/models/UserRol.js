const sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  let alias = "UserRol";
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
    tableName: "UserRoles",
    timestamps: false,
  };

  // definimos la constante modelo.
  const UserRol = sequelize.define(alias, cols, config);

  // creamos la relacion con la tabla

  UserRol.associate = function (models) {
    UserRol.hasMany(models.User, {
      as: "Users", // el alias de la tabla
      foreignKey: "userRolId", // ojo aca verlo
      timestamps: false,
    });
  };

  return UserRol;
};
