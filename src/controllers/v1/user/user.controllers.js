// Utils
const {
  serverErrorResponse,
  successResponse,
} = require('../../../utils/response');

// Helpers
const UserHelper = require('../../../helpers/user');

/**
 * fetches user for given user_id in params
 * */
const getUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const [user, errForUser] = await UserHelper.getUser(user_id);
    if (errForUser)
      return serverErrorResponse({
        res,
        error: errForUser,
      });
    return successResponse(res, `Fetched user successfully`, { user });
  } catch (err) {
    console.log(
      `Error occured while fetcing user for id ${req.params.user_id}: ${err.message}`
    );
    return serverErrorResponse({
      res,
      msg: `Something went wrong, please try again later or contact support`,
    });
  }
};

const UserController = {
  getUser,
};

module.exports = UserController;
