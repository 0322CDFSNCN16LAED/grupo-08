const sequelize = require("sequelize")

module.exports = function (sequelize, DataTypes){
    let alias = 'Room'
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
        tableName: 'Rooms',
        timestamps: false
    }
    const Room = sequelize.define(alias, cols, config)

    Room.associate = function (models){
        Room.belongsToMany(models.Product), {
            as: 'Products',
            through: 'Rooms-Products',
            foreignKey: 'roomId',
            otherKey: 'productId',
            timestamps: false
        }
    }
    return Room
}