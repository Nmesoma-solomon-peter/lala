const { DataTypes } = require("sequelize");
const db = require("../connectDb");

// module.exports = (sequelize, DataTypes) => {
//     const Property = sequelize.define("Property", {
//         id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true,
//         },
//         title: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         description: {
//             type: DataTypes.TEXT,
//             allowNull: false,
//         },
//         pricePerNight: {
//             type: DataTypes.FLOAT,
//             allowNull: false,
//         },
//         location: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         hostId: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             references: {
//                 model: "Users", // References the User model
//                 key: "id",
//             },
//         },
//     });

//     return Property;
// };



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

module.exports = Property


// const { DataTypes } = require("sequelize");
// const db = require("../connectDb");

// const User = db.define("User", {
//   google_id: {
//     type: DataTypes.STRING,
//     unique: true,
//     allowNull: false,
//   },
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING,
//     unique: true,
//     allowNull: false,
//   },
//   role: {
//     type: DataTypes.ENUM('Renter', 'Host'),
//     defaultValue: 'Renter',
//   },
//   profile_pix: {
//     type: DataTypes.STRING, // Stores the profile picture URL or path
//     allowNull: true, // Optional field
//     defaultValue: null, // Default to null if no profile picture is provided
//   },
// }, { timestamps: true });

// module.exports = User;
