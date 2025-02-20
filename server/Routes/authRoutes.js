const router = require("express").Router();
const {googlePopup,googlePopupCallback,googleauthfailure} = require("../Controllers/authController")
const {Logout} = require("../Controllers/logout")
const passport = require("passport")

// google popup route
router.get("/google", googlePopup);
// google popup callback route
router.get("/google/callback",passport.authenticate("google", {session:false}), googlePopupCallback);
// google auth failure
router.get("/failure", googleauthfailure);
router.get("/logout", Logout);


module.exports = router;