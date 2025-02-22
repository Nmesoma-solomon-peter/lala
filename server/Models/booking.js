const { DataTypes } = require("sequelize");
const db = require("../connectDb");


// module.exports = (sequelize, DataTypes) => {
//     const Booking = sequelize.define("Booking", {
//         id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true,
//         },
//         checkInDate: {
//             type: DataTypes.DATE,
//             allowNull: false,
//         },
//         checkOutDate: {
//             type: DataTypes.DATE,
//             allowNull: false,
//         },
//         status: {
//             type: DataTypes.ENUM("Pending", "Confirmed", "Canceled"),
//             defaultValue: "Pending",
//         },
//         renterId: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             references: {
//                 model: "Users", // References the User model
//                 key: "id",
//             },
//         },
//         propertyId: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             references: {
//                 model: "Properties", // References the Property model
//                 key: "id",
//             },
//         },
//     });

//     return Booking;
// };

const Booking = db.define("Booking",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    checkInDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    checkOutDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("Pending", "Confirmed", "Canceled"),
        defaultValue: "Pending",
    },
    renterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Users", // References the User model
            key: "id",
        },
    },
    propertyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Properties", // References the Property model
            key: "id",
        },
    }},{ timestamps: true });

    Booking.associate = (models) => {
        // A Booking belongs to a Property
        Booking.belongsTo(models.Property, {
          foreignKey: 'propertyId', // The foreign key in the Booking table
          as: 'Property', // Alias for the association
        });
      };

    module.exports = Booking
