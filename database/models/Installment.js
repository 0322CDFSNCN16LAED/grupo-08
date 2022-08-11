const sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  let alias = "Installment";
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
    tableName: "Installments",
    timestamps: false,
  };

  // definimos la constante modelo.
  const Installments = sequelize.define(alias, cols, config);

  // creamos la relacion con la tabla

  Installments.associate = function (models) {
    Installments.hasMany(models.Product, {
      as: "Products", // el alias de la tabla
      foreignKey: "installmentId", // ojo aca verlo
      timestamps: false,
    });
  };

  return Installments;
};
