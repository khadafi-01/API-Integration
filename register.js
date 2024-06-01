// Simulate a user database (replace this with actual database operations)
let users = [];

// Handler function to handle user registration
const registerHandler = (request, h) => {
    const { username, password } = request.payload;

    // Check if username and password are provided
    if (!username || !password) {
        return h.response({
            status: 'fail',
            message: 'Username and password are required.',
        }).code(400);
    }

    // Check if the username is already taken
    if (users.some(user => user.username === username)) {
        return h.response({
            status: 'fail',
            message: 'Username already exists.',
        }).code(409); // Conflict
    }

    // Add the new user to the database
    users.push({ username, password });

    return h.response({
        status: 'success',
        message: 'User registered successfully.',
    }).code(201);
};

module.exports = {
    registerHandler
};