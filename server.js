const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const { connectToDatabase, dbConfig } = require('./config/db');

const app = express();
const PORT = 4000;

app.use(bodyParser.json());

dbConfig.connectToDatabase();

app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
