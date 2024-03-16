// Load env
require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}` });

// Packages
const http = require('http');

// Load env variables
const { PORT, NODE_ENV } = require('./utils/config');

// Define port
const port = PORT || 8080;

// Import app
const app = require('./app');

// Set up http server
const server = http.createServer(app);

// If your are using db or any other third party services which required maintaining a connection beforehand like Redis, etc
// then all those connections should be made before you start the server so that it ensures your application runs smoothly
// Starting the server
server.listen(port, () =>
  console.log(`🚀 Server running on port ${port} ENV-${NODE_ENV}`)
);
