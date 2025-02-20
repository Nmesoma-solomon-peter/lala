const User = require("../Models/user")
module.exports.updateUserDetail = async (req, res) => {
    const { id } = req.params; // Get the user ID from the URL
    const { role } = req.body; // Get the new email from the request body    

    try {
        // Find the user by ID
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the user's email
        user.role = role;
        await user.save(); // Save the changes to the database

        res.json({ message: "User updated successfully", user });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "An error occurred while updating the user" });
    }
}

module.exports.findUserDetails = async (req, res) => {
    try {
        // console.log("Received user ID:", req.user.id);

        // Retrieve the user ID from the request object
        const userId = req.user.id;

        // Find the user in the database using the provided ID
        const user = await User.findByPk(userId);

        if (!user) {
            // Respond with 404 if the user is not found
            return res.status(404).json({ error: "User not found." });
        }

        // Respond with the user's data if found
        // console.log("User data:", user.dataValues);
        return res.status(200).json(user.dataValues);

    } catch (err) {
        console.error("Error while fetching user details:", err.message);

        // Respond with 500 for any internal server errors
        return res.status(500).json({ error: "Internal server error." });
    }
};
