const sequelize = require("sequelize")

module.exports = function (sequelize, DataTypes){
    let alias = 'Style'
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
        tableName: 'Styles',
        timestamps: false
    }
    const Style = sequelize.define(alias, cols, config)

    Style.associate = function (models){
        Style.hasMany(models.Product), {
            as: 'Products',
            foreignKey: 'productId',
            timestamps: false
        }
    }
    return Style
}