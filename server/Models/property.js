const { DataTypes } = require("sequelize");
const db = require("../connectDb");

const Property = db.define("Property",  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    pricePerNight: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hostId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Users", // References the User model
            key: "id",
        },
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
},{ timestamps: true });

Property.associate = (models) => {
    // A Property can have many Bookings
    Property.hasMany(models.Booking, {
      foreignKey: 'propertyId', // The foreign key in the Booking table
      as: 'Bookings', // Alias for the association
    });
  };

module.exports = Property


