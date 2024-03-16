/**
 * fetches user for given user_id
 * @param {Number} user_id - user_id for the user you need to fetch
 * @returns user object from db
 * */
const getUser = async (user_id) => {
  try {
    // Fetch user from your db

    const user = { user_id };
    return [user, null];
  } catch (err) {
    console.log(`Error while fetching user in getUser: ${err.message}`);
    return [null, err.message];
  }
};

module.exports = getUser;
