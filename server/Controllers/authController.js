const passport = require("passport");

// controller to call google oauth window popup
module.exports.googlePopup = passport.authenticate("google", { scope: ['profile', 'email'] });

module.exports.googlePopupCallback = (req, res) => {
    // Successful authentication
    const { user, token } = req.user;
    // console.log("coming from call back", user,token);
    
    res.cookie('tokenlala', token, { httpOnly: true, sameSite: 'Lax' }); // Send JWT as a cookie
    res.redirect("http://localhost:5173/dashboard/overview"); // Redirect to your desired page
}

// google authfailure
module.exports.googleauthfailure = (req, res) => {
    res.send("Sorry something went wrong");
};