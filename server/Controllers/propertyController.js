const { Property, Booking } = require("../Models/index");
const { Op } = require("sequelize");


module.exports.createProperty = async (req, res) => {
    try {
        // Log the incoming user and data
        console.log("user", req.user, "data", req.body);

        // Extract user ID and property data
        const hostId = req.user.id;
        const { title, description, pricePerNight, location, image } = req.body;

        // Create the new property in the database
        const newProperty = await Property.create({
            title,
            description,
            pricePerNight,
            location,
            hostId,
            image
        });

        // Respond with the newly created property
        return res.status(201).json({
            message: "Property added successfully",
            property: newProperty,
        });
    } catch (error) {
        console.error("Error adding property:", error.message);
        return res.status(500).json({
            message: "Failed to add property",
            error: error.message,
        });
    }
};

module.exports.getSpecificProperty = async (req, res) => {
    try {
        if (req.params.id) {
            // Extract user ID and property data
            const propertyId = req.params.id;

            // Find all properties where the logged-in user is the host
            const hostProperties = await Property.findOne({
                where: { id: propertyId }
            });

            // If not found, return a message
            if (!hostProperties) {
                return res.status(404).json({ message: "No property found for this host." });
            }
            // Respond with the list of properties
            return res.status(200).json({
                message: "Property retrieved successfully",
                property: hostProperties,
            });
        } else {
            // Extract user ID and property data
            const hostId = req.user.id;

            // Find all properties where the logged-in user is the host
            const hostProperties = await Property.findAll({
                where: { hostId }
            });

            // If no properties found, return a message
            if (hostProperties.length === 0) {
                return res.status(404).json({ message: "No properties found for this host." });
            }
            // Respond with the list of properties
            return res.status(200).json({
                message: "Properties retrieved successfully",
                properties: hostProperties,
            });
        }
    } catch (error) {
        console.error("Error retrieving properties:", error);
        return res.status(500).json({ error: "Internal server error, not able to read properties" });
    }
};



module.exports.getAllProperty = async (req, res) => {
    try {
        // Extract user ID and property data
        // const hostId = req.user.id;

        // Find all properties where the logged-in user is the host
        const hostProperties = await Property.findAll({
            where: { isDeleted: false }
        });

        // If no properties found, return a message
        if (hostProperties.length === 0) {
            return res.status(404).json({ message: "No properties found ." });
        }
        // Respond with the list of properties
        return res.status(200).json({
            message: "Properties retrieved successfully",
            properties: hostProperties,
        });
    } catch (error) {
        console.error("Error retrieving properties:", error);
        return res.status(500).json({ error: "Internal server error, not able to read properties" });
    }
};


module.exports.updateProperty = async (req, res) => {
    try {
        // Extract user ID and property ID from the request
        const hostId = req.user.id;
        const propertyId = req.body.postId;

        // Extract updated property data from the request body
        const { title, description, pricePerNight, location } = req.body;

        // Find the property to update
        const propertyToUpdate = await Property.findOne({
            where: { id: propertyId, hostId } //  To be sure the property belongs to the logged-in host
        });

        // If the property is not found, return a 404 error
        if (!propertyToUpdate) {
            return res.status(404).json({ message: "Property not found or you do not have permission to update it." });
        }

        // Update the property with the new data
        const updatedProperty = await propertyToUpdate.update({
            title,
            description,
            pricePerNight,
            location,
        });

        // Respond with the updated property
        return res.status(200).json({
            message: "Property updated successfully",
            property: updatedProperty,
        });
    } catch (error) {
        console.error("Error updating property:", error);
        return res.status(500).json({ error: "Internal server error, not able to update property" });
    }
};


// Hard delete
module.exports.deleteProperty = async (req, res) => {
    try {
        // Log the incoming user and data
        console.log("user", req.user, "propertyId", req.params.id);

        // Extract user ID and property ID from the request
        const hostId = req.user.id;
        const propertyId = req.params.id //  property ID is passed as a URL parameter

        // Find the property to delete
        const propertyToDelete = await Property.findOne({
            where: { id: propertyId, hostId } // Ensure the property belongs to the logged-in host
        });

        // If the property is not found, return a 404 error
        if (!propertyToDelete) {
            return res.status(404).json({ message: "Property not found or you do not have permission to delete it." });
        }

        // Delete the property
        await propertyToDelete.destroy();

        // Respond with a success message
        return res.status(200).json({
            message: "Property deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting property:", error);
        return res.status(500).json({ error: "Internal server error, not able to delete property" });
    }
};


module.exports.deletePropertySoft = async (req, res) => {
    try {
        // Log the incoming user and data
        console.log("user", req.user, "propertyId", req.params.id);

        // Extract user ID and property ID from the request
        const hostId = req.user.id;
        const propertyId = req.params.id;

        // Find the property to delete
        const propertyToDelete = await Property.findOne({
            where: { id: propertyId, hostId }
        });

        // If the property is not found, return a 404 error
        if (!propertyToDelete) {
            return res.status(404).json({ message: "Property not found or you do not have permission to delete it." });
        }

        // Soft delete: Set isDeleted to true and deletedAt to the current timestamp
        propertyToDelete.isDeleted = true;
        propertyToDelete.deletedAt = new Date();
        await propertyToDelete.save();

        // Respond with a success message
        return res.status(200).json({
            message: "Property marked for deletion. It will be permanently deleted after 3 days.",
        });
    } catch (error) {
        console.error("Error deleting property:", error);
        return res.status(500).json({ error: "Internal server error, not able to delete property" });
    }
};

module.exports.bookProperty = async (req, res) => {
    try {
        // Log the incoming user and data
        console.log("user", req.user, "data", req.body);
        // console.log("user", req.user.id, "data", req.body);

        // Extract user ID and property data
        const renterId = req.user.id;
        const { checkIn, checkOut, propertyId } = req.body;

        // Convert checkIn and checkOut to Date objects
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);

        // Check for overlapping bookings
        const overlappingBookings = await Booking.findAll({
            where: {
                propertyId, // Check for the same property
                [Op.or]: [
                    // Condition 1: New checkIn is between existing checkIn and checkOut
                    {
                        checkInDate: { [Op.lte]: checkInDate },
                        checkOutDate: { [Op.gte]: checkInDate },
                    },
                    // Condition 2: New checkOut is between existing checkIn and checkOut
                    {
                        checkInDate: { [Op.lte]: checkOutDate },
                        checkOutDate: { [Op.gte]: checkOutDate },
                    },
                    // Condition 3: New booking completely encompasses an existing booking
                    {
                        checkInDate: { [Op.gte]: checkInDate },
                        checkOutDate: { [Op.lte]: checkOutDate },
                    },
                ],
            },
        });

        // If overlapping bookings exist, return an error
        if (overlappingBookings.length > 0) {
            return res.status(400).json({
                message: "The selected dates overlap with an existing booking.",
            });
        }

        // Create the new property in the database
        const newProperty = await Booking.create({
            checkInDate: checkIn,
            checkOutDate: checkOut,
            renterId: renterId,
            propertyId: propertyId,
        });

        // Respond with the newly created booking
        return res.status(201).json({
            message: "Property added successfully",
            property: newProperty,
        });
    } catch (error) {
        console.error("Error booking:", error.message);
        return res.status(500).json({
            message: "Failed to book Property",
            error: error.message,
        });
    }
};

// find all user/renter bookings


module.exports.getallbookings = async (req, res) => {

    try {
        // Extract user ID and booking data
        const userId = req.user.id
        const userBookings = await Booking.findAll({
            where: { renterId: userId },
            include: [
                {
                    model: Property, // Include the Property model
                    attributes: ["image", "title", "description"], 
                    as: "Property", //alias as defined in the association
                },
            ],
        });

        // Extract relevant data
        const bookingsWithPropertyDetails = userBookings.map((booking) => ({
            id: booking.dataValues.id,
            status: booking.dataValues.status,
            // checkInDate: booking.dataValues.checkInDate,
            // checkOutDate: booking.dataValues.checkOutDate,
            property: {
                image: booking.Property.image,
                title: booking.Property.title,
                description: booking.Property.description,
            },
        }));

        // console.log(bookingsWithPropertyDetails);


        // If no bookings found, return a message
        if (!userBookings) {
            return res.status(404).json({ message: "No bookings found ." });
        }
        // Respond with the list of bookings
        return res.status(200).json({
            message: "Bookings retrieved successfully",
            bookings: bookingsWithPropertyDetails,
        });
    } catch (error) {
        console.error("Error retrieving bookings:", error);
        return res.status(500).json({ error: "Internal server error, not able to read bookings" });
    }
};

// find all booked properties own by a particular host.
module.exports.allbooked = async (req, res) => {
    try {
      // Extract host ID from the request
      const hostId = req.user.id;
  
    //   Find all properties owned by the host
      const hostProperties = await Property.findAll({
        where: { hostId }, // Find properties where the hostId matches
      });
  
      // If no properties are found, return a message
      if (!hostProperties || hostProperties.length === 0) {
        return res.status(404).json({ message: "No properties found for this host." });
      }
  
      // Extract property IDs from the host's properties
      const propertyIds = hostProperties.map((property) => property.id);
  
      //Find all bookings for the host's properties
      const hostBookings = await Booking.findAll({
        where: { propertyId: propertyIds }, // Find bookings for the host's properties
        include: [
          {
            model: Property, // Include the Property model
            attributes: ["image", "title", "description"], 
            as: "Property", //  alias as defined in the association
          },
        ],
      });
  
      // If no bookings are found, return a message
      if (!hostBookings || hostBookings.length === 0) {
        return res.status(404).json({ message: "No bookings found for this host's properties." });
      }
  
    //   Extract relevant data
      const bookingsWithPropertyDetails = hostBookings.map((booking) => ({
        id: booking.dataValues.id,
        status: booking.dataValues.status,
        checkInDate: booking.dataValues.checkInDate,
        checkOutDate: booking.dataValues.checkOutDate,
        property: {
          image: booking.Property.image,
          title: booking.Property.title,
          description: booking.Property.description,
        },
      }));
  
      // Respond with the list of bookings
      return res.status(200).json({
        message: "Bookings retrieved successfully",
        bookings: bookingsWithPropertyDetails,
      });
    } catch (error) {
      console.error("Error retrieving bookings:", error);
      return res.status(500).json({ error: "Internal server error, not able to read bookings" });
    }
  };


// Function to subtract one day from a date
function subtractOneDay(isoDateString) {
    const date = new Date(isoDateString);
    date.setDate(date.getDate() - 1);
    return date.toISOString();
}


module.exports.getDateRange = async (req, res) => {
    try {
        if (req.params.id) {
            // Extract user ID and property data
            const propertyId = req.params.id;

            // Find all bookings with the specific propertyId
            const bookedDetials = await Booking.findAll({
                where: { propertyId }
            });
            // console.log(bookedDetials);
            const bookingRange = bookedDetials.map((details) => ({
                start: subtractOneDay(details.dataValues.checkInDate),
                end: subtractOneDay(details.dataValues.checkOutDate),
            }))

            // If not found, return a message
            if (!bookedDetials) {
                return res.status(404).json({ message: "No Booking for this property." });
            }
            // Respond with the list of properties
            return res.status(200).json({
                message: "Property retrieved successfully",
                Dates: bookingRange,
            });
        }
    } catch (error) {
        console.error("Error retrieving properties:", error);
        return res.status(500).json({ error: "Internal server error, not able to read properties" });
    }
};

// to update booking
module.exports.updatebooking = async (req, res) => {
  try {
    // Extract bookingId and status from the request body
    const { bookingId, status } = req.body;
    
    console.log(status,bookingId);
    

    // Validate the status
    if (!["Confirmed", "Canceled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status. Must be 'Confirmed' or 'Canceled'." });
    }

    // Find the booking by ID
    const bookingToUpdate = await Booking.findOne({
      where: { id: bookingId },
    });

    // If the booking is not found, return a 404 error
    if (!bookingToUpdate) {
      return res.status(404).json({ message: "Booking not found." });
    }

    // Update the booking status
    bookingToUpdate.status = status;
    await bookingToUpdate.save();

    // Respond with the updated booking
    return res.status(200).json({
      message: "Booking status updated successfully",
      booking: bookingToUpdate,
    });
  } catch (error) {
    console.error("Error updating booking status:", error);
    return res.status(500).json({ error: "Internal server error, not able to update booking status" });
  }
};
