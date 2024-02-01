// utils/keyGenerator.js
const crypto = require('crypto');

const generateRandomString = (length) => {
    return crypto.randomBytes(length).toString('hex');
};

const generateRandomKey = () => {
    return generateRandomString(32); // Generate a 32-character random key
};

module.exports = { generateRandomKey };
