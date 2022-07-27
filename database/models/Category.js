const sequelize = require("sequelize")

module.exports = function (sequelize, dataTypes){
    let alias = 'Category'
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
        tableName: 'Categories',
        timestamps: false
    }
    const Category = sequelize.define(alias, cols, config)

    Category.associate = function (models){
        Category.hasMany(models.Product), {
            as: 'Products',
            foreignKey: 'productId',
            timestamps: false
        }
    }
    return Category
}