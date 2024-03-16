// Package imports
const express = require('express');
const app = express();

// Route imports
const userRoutes = require('./user');

// Routes
app.use('/user', userRoutes);

module.exports = app;
