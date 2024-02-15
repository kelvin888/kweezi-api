const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');
const { dbConfig } = require('./config/db');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(bodyParser.json());

app.use(cors());

dbConfig.connectToDatabase();

app.use('/auth', authRoutes);
app.use('/quiz', quizRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
