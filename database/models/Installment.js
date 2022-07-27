const sequelize = require("sequelize")

module.exports = function (sequelize, dataTypes){
    let alias = 'Installments'
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