// Utils
const {
  serverErrorResponse,
  unauthorizedResponse,
} = require('../utils/response');

// Packages
const { v4: uuidv4 } = require('uuid');

/**
 * Performs basic auth for your app by verifying the access token sent in authorization as a bearer token
 * */
const auth = async (req, res, next) => {
  try {
    // If not authorization provided
    if (req.headers.authorization === undefined)
      return unauthorizedResponse({ res });

    // generate correlationid
    // this will be logged by morgan for the request
    res.correlationId = uuidv4();

    const accessToken = req.headers.authorization.split(' ')[1];

    // Check if the accessToken is valid or not depending on your method
    // One method is to decode the token and check whether it is a valid token or not
    // If token is invalid return unauthorizedResponse
    // If token is valid, then pass the control to the next controller using next()
    next();
  } catch (err) {
    console.log(`Error while authenticating user: ${err.message}`);
    return serverErrorResponse({
      res,
      error: `Error while authenticating user: ${err.message}`,
    });
  }
};

module.exports = auth;
