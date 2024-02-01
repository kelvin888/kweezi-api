function validateFields(fields, res) {
    for (const field of fields) {
        if (!field.value) {
            return res.status(400).json({ message: `${field.name} cannot be empty` });
        }
    }
    return null;
}

module.exports = { validateFields };
