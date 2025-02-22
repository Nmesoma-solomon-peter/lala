const db = require("../connectDb");
const Property = require("./property");
const Booking = require("./booking");


// Define associations
Property.associate(db.models);
Booking.associate(db.models);

module.exports = {
  Property,
  Booking,
};