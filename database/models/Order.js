const sequelize = require("sequelize")

module.exports = function (sequelize, dataTypes){
    let alias = 'Order'
    let cols = {
        id: {
            type: dataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        orderDate:{
            type: dataTypes.DATE,
        },
        orderTotal: {
            type: dataTypes.DECIMAL
        }
    }
    let config = {
        tableName: 'Orders',
        timestamps: false
    }
    const Order = sequelize.define(alias, cols, config)

    Order.associate = function (models){
        Order.belongsToMany(models.Product), {
            as: 'Products',
            through: 'Orders-Products',
            foreignKey: 'orderId',
            otherKey: 'productId',
            timestamps: false
        }
    }
    return Order
}