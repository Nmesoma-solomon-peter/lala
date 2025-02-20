const router = require("express").Router();
const {createProperty,getSpecificProperty,getAllProperty,updateProperty,deleteProperty, deletePropertySoft} = require("../Controllers/propertyController")
const {userVerification} = require("../Middleware/verifyUser")

// route to create property
router.post("/createproperty",userVerification,createProperty);

// route to get a specific user property
router.get("/getspecificproperty",userVerification,getSpecificProperty);

// route to get all  property
router.get("/getallproperty",userVerification,getAllProperty);

// update property
router.put("/updateproperty", userVerification,updateProperty);

// update property
router.delete("/deleteproperty/:id", userVerification,deleteProperty);
router.delete("/deletepropertysoft/:id", userVerification,deletePropertySoft);

module.exports = router;