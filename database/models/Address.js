const sequelize = require("sequelize")

module.exports = function (sequelize, dataTypes){
    let alias = 'Address'
    let cols = {
        id: {
            type: dataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        address: {
            type: dataTypes.STRING,
        },
        city: {
            type: dataTypes.STRING,
        },
        state: {
            type: dataTypes.STRING,
        },
        country: {
            type: dataTypes.STRING,
        },
        zipcode: {
            type: dataTypes.INTEGER,
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