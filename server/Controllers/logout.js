// module.exports.logout = (req, res, next) => {
//     // Passport.js method to remove the user's authentication state
//     // req.logout((err) => {
//     //     if (err) {
//     //         return next(err);
//     //     }
//     //     // Destroy the session
//     //     req.session.destroy((err) => {
//     //         if (err) {
//     //             return next(err);
//     //         }
//     //         // Clear the session cookie
//     //         res.clearCookie("connect.sid"); // "connect.sid" is the default name for the session cookie
//     //         // Redirect the user to the home page or login page
//     //         res.redirect("/");
//     //     });
//     //});
//     console.log("I am logout");

// }
// logoutController
module.exports.Logout = async (req, res) => {
    try {
        res.clearCookie('tokenlala'); // Clear authentication cookie
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.send({"LogoutError":error})
    }
}