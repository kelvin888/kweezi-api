const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');
const keyGenerator = require('../utils/keyGenerator');
const config = require('../utils/config');
const validationUtils = require('../utils/validation')

const generateRandomKey = () => keyGenerator.generateRandomKey();

const {
    JWT_SECRET_KEY: secretKey,
    JWT_REFRESH_SECRET_KEY: refreshSecretKey,
} = process.env;

const accessTokenExpiresIn = config.jwt.accessTokenExpiresIn;
const refreshTokenExpiresIn = config.jwt.refreshTokenExpiresIn;

const hashPassword = async (password) => bcrypt.hash(password, 10);

const register = async (req, res) => {
    try {
        const { email, password, firstname, lastname } = req.body;

        const validationFields = [
            { name: 'Email', value: email },
            { name: 'Password', value: password },
            { name: 'Firstname', value: firstname },
            { name: 'Lastname', value: lastname },
        ];

        const validationError = validationUtils.validateFields(validationFields, res);

        if (validationError) {
            return validationError;
        }

        const existingUser = await userRepository.findUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await hashPassword(password);

        await userRepository.createUser({ email, password: hashedPassword, firstname, lastname });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: `Something went wrong: ${error.message}` });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userRepository.findUserByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const accessToken = jwt.sign(
            { email: user.email },
            secretKey || generateRandomKey(),
            { expiresIn: accessTokenExpiresIn }
        );
        const refreshToken = jwt.sign(
            { email: user.email },
            refreshSecretKey || generateRandomKey(),
            { expiresIn: refreshTokenExpiresIn }
        );

        res.json({ accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { register, login, hashPassword };
