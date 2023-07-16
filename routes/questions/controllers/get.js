const questionModel = require('../models/question');

module.exports = (req, res) => {
	authorId = req.author_id;
	questionModel
		.find({ author_id: authorId })
		.then((result) => {
			res.json(result);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).send('Error while getting questions');
		});
};
