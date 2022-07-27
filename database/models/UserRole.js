const sequelize = require("sequelize")

module.exports = function (sequelize, dataTypes){
    let alias = 'UserRole'
    let cols = {
        id: {
            type: dataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: dataTypes.STRING,
        }
    }
    let config = {
        tableName: 'UserRoles',
        timestamps: false
    }
    const UserRole = sequelize.define(alias, cols, config)

    UserRole.associate = function (models){
        UserRole.hasMany(models.User), {
            as: 'Users',
            foreignKey: 'userId',
            timestamps: false
        }
    }
    return UserRole
}