const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
	name: { type: String, required: true },
	author_id: { type: mongoose.Schema.ObjectId, required: true, ref: 'user' },
	body: { type: Object, _id: 0 },
	sphere_engine_problem_id: { type: String, required: true },
});

module.exports = mongoose.model('question', questionSchema);
