const express = require('express');
const router = express.Router();

let users = [];

// Handler function to handle user registration
const registerHandler = (req, res) => {
    const { username, email, password } = req.body;

    // Check if username, email, and password are provided
    if (!username || !email || !password) {
        return res.status(400).json({
            status: 'fail',
            message: 'Username, email, and password are required.',
        });
    }

    // Check if the username or email is already taken
    if (users.some(user => user.username === username || user.email === email)) {
        return res.status(409).json({
            status: 'fail',
            message: 'Username or email already exists.',
        }); // Conflict
    }

    // Add the new user to the database
    users.push({ username, email, password });

    return res.status(201).json({
        status: 'success',
        message: 'User registered successfully.',
    });
};

// Register route
router.post('/register', registerHandler);

module.exports = router;