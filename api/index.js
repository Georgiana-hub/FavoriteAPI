const { Router } = require('express');

const app = Router();

// Import all the routers
const favoriteRouter = require('./routes/favoriteRouter');

// Add all the routers as middlewares
app.use('/favorites', favoriteRouter);

module.exports = app;
