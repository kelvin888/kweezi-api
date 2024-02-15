// controllers/quizController.js
const quizRepository = require('../repositories/quizRepository');

const createQuiz = async (req, res) => {
    try {
        const { title, questions } = req.body;
        const quiz = await quizRepository.createQuiz({ title, questions });
        res.status(201).json(quiz);
    } catch (error) {
        res.status(500).json({ error: `Something went wrong: ${error.message}` });
    }
};

const getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await quizRepository.getAllQuizzes();
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ error: `Something went wrong: ${error.message}` });
    }
};

// Other controller functions for quiz management

module.exports = {
    createQuiz,
    getAllQuizzes,
    // Other exported functions
};
