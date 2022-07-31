const sequelize = require("sequelize")

module.exports = function (sequelize, DataTypes){
    let alias = 'Category'
    
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