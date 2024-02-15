// routes/quizRoutes.js
const express = require('express');
const quizController = require('../controllers/quizController');

const router = express.Router();

router.post('/quizzes', quizController.createQuiz);
router.get('/quizzes', quizController.getAllQuizzes);
// Define other routes as needed

module.exports = router;
