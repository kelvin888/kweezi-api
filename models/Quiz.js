const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
});

const questionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true,
    },
    options: [optionSchema], // Use the option schema here
});

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    questions: [questionSchema],
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
