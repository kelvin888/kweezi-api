// middleware/validation.js
const { body, validationResult } = require('express-validator');

const validateQuiz = [
    body('title').notEmpty().withMessage('Title is required'),
    body('questions').isArray().withMessage('Questions must be an array'),
    body('questions.*.questionText').notEmpty().withMessage('Question text is required'),
    body('questions.*.options').isArray().withMessage('Options must be an array'),
    body('questions.*.options.*.text').notEmpty().withMessage('Option text is required'),
    body('questions.*.options.*.id').notEmpty().withMessage('Option id is required'),
    // Update validation rule for options
    body('questions.*.options.*').isObject().withMessage('Option must be an object'),
    body('questions.*.options.*.text').isString().withMessage('Option text must be a string'),
    body('questions.*.options.*.id').isString().withMessage('Option id must be a string'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = {
    validateQuiz,
    // Other validation middleware
};
