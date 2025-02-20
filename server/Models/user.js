const { DataTypes } = require("sequelize");
const db = require("../connectDb");

const User = db.define("User", {
  google_id: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('Renter', 'Host'),
    defaultValue: 'Renter',
  },
  profile_pix: {
    type: DataTypes.STRING, // Stores the profile picture URL or path
    allowNull: true, // Optional field
    defaultValue: null, // Default to null if no profile picture is provided
  },
}, { timestamps: true });

module.exports = User;
