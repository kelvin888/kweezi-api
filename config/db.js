const mongoose = require('mongoose');
require('dotenv').config();

const dbConfig = {
    connectToDatabase: () => {
        const DATABASE_URL = process.env.DATABASE_URL;

        if (!DATABASE_URL) {
            console.error('MongoDB connection string not provided. Exiting...');
            process.exit(1);
        }

        mongoose.connect(DATABASE_URL);

        mongoose.connection.on('connected', () => {
            console.log('Connected to DB');
        });

        mongoose.connection.on('error', (err) => {
            console.error(`MongoDB connection error: ${err}`);
        });
    }
}

module.exports = { dbConfig };
