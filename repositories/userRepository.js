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

module.exports = {
    createUser,
    findUserByEmail,
};
