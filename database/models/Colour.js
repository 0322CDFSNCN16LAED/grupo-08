const sequelize = require("sequelize")

module.exports = function (sequelize, DataTypes){
    let alias = 'Colour'
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
        tableName: 'Colours',
        timestamps: false
    }
    const Colour = sequelize.define(alias, cols, config)

    Colour.associate = function (models){
        Colour.hasMany(models.Product), {
            as: 'Products',
            foreignKey: 'productId',
            timestamps: false
        }
    }
    return Colour
}