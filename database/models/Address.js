const sequelize = require("sequelize")

module.exports = function (sequelize, DataTypes){
    let alias = 'Address'
    let cols = {
        id: {
            allowNull: false,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        address: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        city: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        state: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        country: {
            type: DataTypes.STRING,
        },
        zipcode: {
            allowNull: false,
            type: DataTypes.INTEGER,
        }

    }
    let config = {
        tableName: 'Addresses',
        timestamps: false
    }
    const Address = sequelize.define(alias, cols, config)

    Address.associate = function (models){
        Address.belongsTo(models.User), {
            as: 'Users',
            foreignKey: 'userId',
            timestamps: false
        }
    }
    return Address
}