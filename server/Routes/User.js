const express = require('express');
const router = express.Router();
const User = require('../models/User');

const bcrypt = require('bcrypt');

// Signup route
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists!" });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with hashed password
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "Signup successful!" });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: "Server error during signup!" });
    }
});


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials!" });
        }

        // Compare the passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials!" });
        }

        res.status(200).json({ message: "Login successful!" });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: "Server error during login!" });
    }
});


// Get all users (for testing)
router.get("/User", async (req, res) => {
    try {
        const data = await User.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
