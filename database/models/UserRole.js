const sequelize = require("sequelize")

module.exports = function (sequelize, DataTypes){
    let alias = 'UserRole'
    // configuramos las columnas

    let cols = {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }
     // asignamos en nombre de la tabla en la DB
    let config = {
        tableName: 'UserRoles',
        timestamps: true,
        paranoid: true,
    }

    // definimos la constante modelo.
    const UserRole = sequelize.define(alias, cols, config)

    // creamos la relacion con la tabla
    UserRole.associate = function (models){
        UserRole.hasMany(models.User), {
            as: 'Users',
            foreignKey: 'userRoleId',
            timestamps: false
        }
    }
    return UserRole
}