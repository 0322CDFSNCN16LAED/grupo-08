const sequelize = require("sequelize")

module.exports = function (sequelize, DataTypes){
    let alias = 'Order'
    let cols = {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        orderDate:{
            type: DataTypes.DATE,
        },
        orderTotal: {
            type: DataTypes.DECIMAL
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