// A file which abstracts responses

const ResponseStatus = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  PAYMENT_REQUIRED: 402,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_ERROR: 500,
};

/**
 * To return a success response indicating that the request was successfully processed
 * @param {Response} res
 * @param {String} msg - message to be displayed to the user
 * @param {String} data - requested data
 * */
const successResponse = (res, msg, data) => {
  if (data) {
    res.status(ResponseStatus.SUCCESS).send({
      msg,
      data,
      correlationId: res.correlationId,
    });
    return;
  }
  res.status(ResponseStatus.SUCCESS).send({
    msg,
    correlationId: res.correlationId,
  });
};

/**
 * To return a created successfully response indicating that the request resource was created successfully
 * @param {Response} res
 * @param {String} msg - message to be displayed to the user
 * @param {String} data - created data
 * */
const createdSuccessResponse = (res, msg, data) => {
  res.status(ResponseStatus.CREATED).send({
    msg,
    data,
    correlationId: res.correlationId,
  });
};

/**
 * To return a not found response indicating such request does not exist
 * @param {Response} res
 * @param {String} msg - message to be displayed to the user
 * @param {String} error - more detailed message that could help the user to understand the error
 * */
const notFoundResponse = ({ res, msg, error }) => {
  if (!msg)
    msg = 'Resource not found. Please try again later or contact support';
  if (!error) error = msg;
  res.status(ResponseStatus.NOT_FOUND).send({
    msg: msg,
    error: error,
    correlationId: res.correlationId,
  });
};

/**
 * To return a unauthorized response indicating user is not authenticated to make the request
 * @param {Response} res
 * @param {String} msg - message to be displayed to the user
 * @param {String} error - more detailed message that could help the user to understand the error
 * */
const unauthorizedResponse = ({ res, msg, error }) => {
  if (!msg)
    msg = 'Unauthorized. Please check your credentials or contact support';
  if (!error) error = msg;
  res.status(ResponseStatus.UNAUTHORIZED).send({
    msg: msg,
    error: error,
    correlationId: res.correlationId,
  });
};

/**
 * To return a bad request response indicating that such request wasn't supposed to be made
 * @param {Response} res
 * @param {String} msg - message to be displayed to the user
 * @param {String} error - more detailed message that could help the user to understand the error
 * */
const badRequestResponse = ({ res, msg, error }) => {
  if (!msg) msg = 'Invalid request. Please try again later or contact support';
  if (!error) error = msg;
  res.status(ResponseStatus.BAD_REQUEST).send({
    msg: msg,
    error: error,
    correlationId: res.correlationId,
  });
};

/**
 * To return a forbidden response indicating that the user is forbidded from accessing the requested resource
 * @param {Response} res
 * @param {String} msg - message to be displayed to the user
 * @param {String} error - more detailed message that could help the user to understand the error
 * */
const forbiddenResponse = ({ res, msg, error }) => {
  if (!msg) msg = 'Access denied. Please contact support for assistance';
  if (!error) error = msg;
  res.status(ResponseStatus.FORBIDDEN).send({
    msg: msg,
    error: error,
    correlationId: res.correlationId,
  });
};

/**
 * To return a server error response indicating something went wrong on server side
 * @param {Response} res
 * @param {String} msg - message to be displayed to the user
 * @param {String} error - more detailed message that could help the user to understand the error
 * */
const serverErrorResponse = ({ res, msg, error }) => {
  if (!msg)
    msg = 'An error occurred, please try again later or contact support';
  if (!error) error = msg;
  res.status(ResponseStatus.INTERNAL_ERROR).send({
    msg: msg,
    error: error,
    correlationId: res.correlationId,
  });
};

/**
 * To return a unprocessable entity response indicating the body/params/query is not as required
 * @param {Response} res
 * @param {String} msg - message to be displayed to the user
 * @param {String} error - more detailed message that could help the user to understand the error
 * */
const unprocessableEntityResponse = ({ res, msg, error }) => {
  // so that we can see why JOI failed in logs while debugging
  if (error) logger.error(`JOI validation failed: ${error}`);
  if (!msg)
    msg =
      "We're unable to fulfill your request at this time. Please try again later or contact support";
  if (!error) error = msg;
  res.status(ResponseStatus.UNPROCESSABLE_ENTITY).send({
    msg: msg,
    error: error,
    correlationId: res.correlationId,
  });
};

/**
 * To return a payment required response
 * @param {Response} res
 * @param {String} msg - message to be displayed to the user
 * @param {Object|String} data - extra details about the payment for user
 * @param {String} error - more detailed message that could help the user to understand the error
 * */
const paymentRequiredResponse = ({ res, msg, data, error }) => {
  if (!msg)
    msg =
      'Payment required. Please complete the payment process or contact support';
  if (!error) error = msg;
  res.status(ResponseStatus.PAYMENT_REQUIRED).send({
    msg: msg,
    data,
    error: error,
    correlationId: res.correlationId,
  });
};

module.exports = {
  successResponse,
  createdSuccessResponse,
  notFoundResponse,
  unauthorizedResponse,
  badRequestResponse,
  forbiddenResponse,
  serverErrorResponse,
  unprocessableEntityResponse,
  paymentRequiredResponse,
};
