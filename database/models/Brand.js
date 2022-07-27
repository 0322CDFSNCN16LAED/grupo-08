const sequelize = require("sequelize")

module.exports = function (sequelize, dataTypes){
    let alias = 'Brand'
    let cols = {
        id: {
            type: dataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: dataTypes.STRING
        }
    }
    let config = {
        tableName: 'Brands',
        timestamps: false
    }
    const Brand = sequelize.define(alias, cols, config)
    
    Brand.associate = function (models){
        Brand.hasMany(models.Product), {
            as: 'Products',
            foreignKey: 'productId',
            timestamps: false
        }
    }
    return Brand
}