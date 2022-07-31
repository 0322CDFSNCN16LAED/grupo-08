const sequelize = require("sequelize")

module.exports = function (sequelize, DataTypes){
    let alias = 'Installments'
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
        tableName: 'Installments',
        timestamps: false
    }
    const Installments = sequelize.define(alias, cols, config)

    Installments.associate = function (models){
        Installments.hasMany(models.Product), {
            as: 'Products',
            foreignKey: 'productId',
            timestamps: false
        }
    }
    return Installments
}