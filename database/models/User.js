const sequelize = require("sequelize")

module.exports = function (sequelize, DataTypes){
    let alias = 'User'
    let cols = {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        phoneNumber: {
            type: DataTypes.INTEGER
        },
        profilePic: {
            type: DataTypes.STRING
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