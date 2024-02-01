const mongoose = require('mongoose');
require('dotenv').config();

const dbConfig = {
    connectToDatabase: () => {
        const MONGODB_URI = process.env.MONGODB_URI;

        if (!MONGODB_URI) {
            console.error('MongoDB connection string not provided. Exiting...');
            process.exit(1);
        }

        mongoose.connect(MONGODB_URI);

        mongoose.connection.on('connected', () => {
            console.log('Connected to MongoDB');
        });

        mongoose.connection.on('error', (err) => {
            console.error(`MongoDB connection error: ${err}`);
        });
    }
}

module.exports = { dbConfig };
