const sequelize = require("sequelize")

module.exports = function (sequelize, dataTypes){
    let alias = 'Style'
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