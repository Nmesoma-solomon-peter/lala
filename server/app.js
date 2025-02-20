require("dotenv").config();
const express = require("express");
const passport = require("passport");
// const session = require("express-session");
const connectionDetails = require("./connectDb");
const User = require("./Models/user");
const authRoute = require("./Routes/authRoutes");
const usersRoutes = require("./Routes/usersRoutes")
const property = require("./Routes/properties")
const { logout } = require("./Controllers/logout")
const { } = require("./Controllers/logout")
const jwt = require('jsonwebtoken');
const cors = require("cors")
const cookieParser = require('cookie-parser');
require("./utils/auth");
const app = express();
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // Allows cookies to be sent
  // methods: ["GET", "POST", "PUT", "DELETE"], // Explicitly allow these methods
  allowedHeaders: ["Content-Type", "Authorization"], // Explicitly allow these headers
}));

app.use(express.json());
app.use(express.urlencoded());


app.get("/", (req, res) => {
  res.send('<a href="/auth/google"> Authenticate with Google</a>')
})
app.use("/auth", authRoute);
app.use("/users", usersRoutes);
app.use("/property", property);
// Logout route

// sequelize.sync().then(()=> app.listen(5000, ()=> console.log("server is running on port 5000")))

connectionDetails.sync().then(() => {
  app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
  });
});
