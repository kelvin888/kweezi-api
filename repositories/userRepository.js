const User = require('../models/User');

const createUser = async ({ email, password, firstname, lastname }) => {
    const user = new User({
        email,
        password,
        firstname,
        lastname,
    });

    await user.save();
    return user;
};

const findUserByEmail = async (email) => {
    return User.findOne({ email });
};

// Add any other relevant functions

module.exports = {
    createUser,
    findUserByEmail,
};
