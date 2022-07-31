const sequelize = require("sequelize")

module.exports = function (sequelize, DataTypes){
    let alias = 'Brand'
    let cols = {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING
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