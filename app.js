// Rename handler.js to app.js
// Import express library
const express = require('express');

// Import serverless-http library
const sls = require('serverless-http');

// Create an instance of express app
const app = express();

// Create a GET endpoint for the root route
app.get('/', async (req, res, next) => {
    // Send a response with status 200 and message "Hello World!"
    res.status(200).send('Hello World!');
});

// Export the express app as a serverless function named "server"
module.exports.server = sls(app);
