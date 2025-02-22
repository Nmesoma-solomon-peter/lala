// const Property = require("../Models/property")
// const Booking = require("../Models/booking")
const { Property, Booking } = require("../Models/index");


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
                    attributes: ["image", "title", "description"], // Fetch only these fields
                    as: "Property", // Use the same alias as defined in the association
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
        if (!userBookings ) {
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



module.exports.getDateRange = async (req, res) => {
    try {
        if (req.params.id) {
            // Extract user ID and property data
            const propertyId = req.params.id;

            // Find all bookings with the specific propertyId
            const bookedDetials = await Booking.findOne({
                where: { propertyId }
            });
            console.log(bookedDetials);
            bookedDetials.map((details)=>{
            checkInDate: details.dataValues.checkInDate,
            checkOutDate: details.dataValues.checkOutDate,
            })
            
            // // If not found, return a message
            // if (!bookedDetials) {
            //     return res.status(404).json({ message: "No Booking for this property." });
            // }
            // // Respond with the list of properties
            // return res.status(200).json({
            //     message: "Property retrieved successfully",
            //     property: hostProperties,
            // });
        } 
    } catch (error) {
        console.error("Error retrieving properties:", error);
        return res.status(500).json({ error: "Internal server error, not able to read properties" });
    }
};