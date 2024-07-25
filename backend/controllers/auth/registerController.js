import { hashPassword } from '../../helper/authHelper.js';
import User from '../../models/userModel.js';

// POST REGISTER
export const registerController = async (req, res) => {
    try {
        const { name, email, phone, password, address, isSeller, username } = req.body;

        // Validate request data
        if (!name || !email || !password || !phone || !address) {
            return res.status(400).send({
                success: false,
                message: "All fields are required.",
            });
        }

        // Check for existing users by email
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(400).send({
                success: false,
                message: "Email already registered!",
                errorType: "emailConflict",
            });
        }

        // If username is provided, check for existing users by username
        if (username) {
            const existingUserByUsername = await User.findOne({ username });
            if (existingUserByUsername) {
                return res.status(400).send({
                    success: false,
                    message: "Username already taken!",
                    errorType: "usernameConflict",
                });
            }
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Register the user
        const user = new User({
            name,
            email,
            phone,
            password: hashedPassword,
            address,
            role: isSeller ? 1 : 0,
            username, // Include username if provided
        });

        await user.save(); // Save the user to the database

        // Respond with success
        res.status(201).send({
            success: true,
            message: "User Registered Successfully!",
            user,
        });

    } catch (error) {
        console.error('Registration error:', error); // Log detailed error
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error: error.message || "Unknown error",
        });
    }
};
