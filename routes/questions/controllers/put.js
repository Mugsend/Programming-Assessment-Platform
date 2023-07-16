const questionModel = require('../models/question');

module.exports = (req, res) => {
	console.log(req.params);
	const { questionId } = req.params;
	const { name, body } = req.body;
	questionModel
		.findById(questionId)
		.then((result) => {
			if (!result) res.status(400).send('Could not find the problem');
			else {
				result
					.updateOne({ name, body })
					.then((result) => {
						res.send('Question details updated');
					})
					.catch((error) => {
						console.debug(error);
						res.status(500).send('Error while updating question');
					});
			}
		})
		.catch((error) => {
			console.debug(error);
			res.status(500).send('Error while updating problem');
		});
};
