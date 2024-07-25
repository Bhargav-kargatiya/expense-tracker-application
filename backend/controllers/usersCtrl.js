const asyncHandler = require("express-async-handler");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { log } = require("console");

//! User Regestration Controller
const userController = {
    //!Register
    register: asyncHandler(async (req, res) => {
        const { username, email, password } = req.body;

        //!Validate
        if (!username || !email || !password) {
            throw new Error("Please all fields are required");
        }

        //!Check if user already exists
        const userExits = await User.findOne({ email });
        if (userExits) {
            throw new Error("User already exists");
        }
        //! Hash the user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //! Create the user and save into db
        const userCreated = await User.create({
            email,
            username,
            password: hashedPassword
        });
        //! Send the response
        res.json({ username: userCreated.username, email: userCreated.email, id: userCreated._id });
    }),

    //!Login
    login: asyncHandler(async (req, res) => {
        // Get the user data
        const { email, password } = req.body;
        // check if email is valid
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("Invalid login credentials");
        }
        // Compare the user password
        const isMach = await bcrypt.compare(password, user.password)
        if (!isMach) {
            throw new Error("Invalid login credentials");
        }
        // Generate a token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
        //Send the response
        res.json({
            message: "Login Success",
            token,
            id: user._id,
            email: user.email,
            username: user.username
        })
    }),

    //!profile
    profile: asyncHandler(async (req, res) => {

        // Find the user
        const user = await User.findById(req.user);
        if (!user) {
            throw new Error("User not found");
        }
        // Send the response
        res.json({ username: user.username, email: user.email, id: user._id });
    }),

    //! change password
    changeUserPassword: asyncHandler(async (req, res) => {
        const { newPassword } = req.body;
        //Find the user
        const user = await User.findById(req.user);
        if (!user) {
            throw new Error("User not found");
        }
        // Hash the new password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        //Resave the user
        await user.save();
        // Send the response
        res.json({ message: "Password changed successfully", username: user.username, email: user.email, id: user._id });
    }),

    //! Update user Profile
    updateUserPofile: asyncHandler(async (req, res) => {
        const { email, username } = req.body;
        // Find the user
        const user = await User.findByIdAndUpdate(req.user, {
            username, email
        }, { new: true, });
        // Send the response
        res.json({ message: "Usre Profile updated successfully", username: user.username, email: user.email, id: user._id });
    })
}


module.exports = userController;