const sequelize = require("sequelize")
const Colour = require("./Colour")

module.exports = function (sequelize, dataTypes){
    let alias = 'Product'
    let cols = {
        id: {
            type: dataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: dataTypes.STRING
        },
        price: {
            type: dataTypes.DECIMAL
        },
        freeDelivery: {
            type: dataTypes.INTERGER
        },
        description: {
            type: dataTypes.STRING
        },
        measurements: {
            type: dataTypes.STRING
        },
        details: {
            type: dataTypes.STRING
        },
        extraInfo: {
            type: dataTypes.STRING
        },
        picture: {
            type: dataTypes.STRING
        }
    }
    let config = {
        tableName: 'Products',
        timestamps: false
    }
    const Product = sequelize.define(alias, cols, config)

    Product.associate = function (models){
        Product.belongsTo(models.Colour), {
            as: 'Colour',
            foreignKey: 'colourId',
            timestamps: false
        },
        Product.belongsTo(models.Brand), {
            as: 'Brand',
            foreignKey: 'brandId',
            timestamps: false
        },
        Product.belongsTo(models.Installments), {
            as: 'Installments',
            foreignKey: 'installmentsId',
            timestamps: false
        },
        Product.belongsTo(models.Style), {
            as: 'Style',
            foreignKey: 'styleId',
            timestamps: false
        },
        Product.belongsTo(models.Category), {
            as: 'Category',
            foreignKey: 'categoryId',
            timestamps: false
        },
        Product.belongsToMany(models.Room), {
            as: 'Rooms',
            through: 'Rooms-Products',
            foreignKey: 'productId',
            otherKey: 'roomId',
            timestamps: false
        },
        Product.belongsToMany(models.Order),{
            as: 'Orders',
            through: 'Orders-Products',
            foreignKey: 'productId',
            otherKey: 'orderId',
            timestamps: false
        }
    }
    return Product
}