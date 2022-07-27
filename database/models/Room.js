const sequelize = require("sequelize")

module.exports = function (sequelize, dataTypes){
    let alias = 'Room'
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