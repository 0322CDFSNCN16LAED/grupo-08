const sequelize = require("sequelize")

module.exports = function (sequelize, dataTypes){
    let alias = 'User'
    let cols = {
        id: {
            type: dataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: dataTypes.STRING
        },
        lastName: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        phoneNumber: {
            type: dataTypes.INTEGER
        },
        profilePic: {
            type: dataTypes.STRING
        },
    }
    let config = {
        tableName: 'Users',
        timestamps: false
    }
    const User = sequelize.define(alias, cols, config)

    
    User.associate = function (models){
        User.belongsTo(models.Style), {
            as: 'userRole',
            foreignKey: 'userRoleId',
            timestamps: false
        },
        User.belongsTo(models.Address), {
            as: 'address',
            foreignKey: 'addressId',
            timestamps: false
        },
        User.hasMany(models.Order),{
            as: 'Orders',
            foreignKey: 'userId',
            timestamps: false
        }
    }
    return User
}