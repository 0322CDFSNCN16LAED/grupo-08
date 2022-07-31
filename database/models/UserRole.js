const sequelize = require("sequelize")

module.exports = function (sequelize, DataTypes){
    let alias = 'UserRole'
    let cols = {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
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