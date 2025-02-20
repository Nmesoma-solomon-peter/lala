const router = require("express").Router();
const {updateUserDetail,findUserDetails} = require("../Controllers/usersController")
const {userVerification} = require("../Middleware/verifyUser")

// update user Route
router.put("/:id",updateUserDetail)
router.get("/dashboard",userVerification,findUserDetails)

module.exports = router