const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String, required: true,
    }, description: {
        type: String,
    }, due_date: {
        type: Date,
    }, priority: {
        type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium',
    }, user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true,
    }, project_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Project',
    }, category_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Category',
    },
});

module.exports = mongoose.model('Task', TaskSchema);
