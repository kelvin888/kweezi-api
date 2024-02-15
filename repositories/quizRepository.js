// repositories/quizRepository.js
const Quiz = require('../models/Quiz');

const createQuiz = async (quizData) => {
    const quiz = new Quiz(quizData);
    await quiz.save();
    return quiz;
};

const getAllQuizzes = async () => {
    return Quiz.find();
};

// Other CRUD operations as needed

module.exports = {
    createQuiz,
    getAllQuizzes,
    // Other exported functions
};
