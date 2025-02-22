const router = require("express").Router();
const {createProperty,getSpecificProperty,getAllProperty,updateProperty,deleteProperty, deletePropertySoft,bookProperty, getallbookings,getDateRange,allbooked,updatebooking} = require("../Controllers/propertyController")
const {userVerification} = require("../Middleware/verifyUser")

// route to create property
router.post("/createproperty",userVerification,createProperty);

// route to get a specific user property for host
router.get("/getspecificproperty",userVerification,getSpecificProperty);
// route to get a specific user property for user
router.get("/getspecificproperty/:id",userVerification,getSpecificProperty);

// route to get all  property
// router.get("/getallproperty",userVerification,getAllProperty);
router.get("/getallproperty",getAllProperty);

// update property
router.put("/updateproperty", userVerification,updateProperty);

// update booking
router.put("/updatebooking",userVerification,updatebooking)

// update property
router.delete("/deleteproperty/:id", userVerification,deleteProperty);
router.delete("/deletepropertysoft/:id", userVerification,deletePropertySoft);

// book property route
router.post("/bookproperty",userVerification,bookProperty);

//find all user/renter bookings
router.get("/allbookings",userVerification,getallbookings)

// get all propertry owned by a particular Host
router.get("/allbooked",userVerification,allbooked)

// find checkin and checkout date for booking
router.get("/getdaterange/:id",userVerification,getDateRange);

module.exports = router;