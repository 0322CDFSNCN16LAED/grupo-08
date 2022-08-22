const { DataTypes } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      price: {
        type: DataTypes.DECIMAL(25, 2),
      },
      measurements: {
        type: DataTypes.STRING,
      },
      freeDelivery: {
        type: DataTypes.INTEGER,
      },
      details: {
        type: DataTypes.STRING,
      },
      extraInfo: {
        type: DataTypes.STRING,
      },
      picture: {
        type: DataTypes.STRING,
      },
      categoryId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Categories",
          key: "id",
        },
      },
      colourId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Colours",
          key: "id",
        },
      },
      brandId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Brands",
          key: "id",
        },
      },
      installmentId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Installments",
          key: "id",
        },
      },
      styleId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Styles",
          key: "id",
        },
      },
    });

    await queryInterface.createTable("RoomsProducts", {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      roomId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Rooms",
          key: "id",
        },
      },
      productId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Products",
          key: "id",
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("RoomsProducts");
    await queryInterface.dropTable("Products");
  },
};
