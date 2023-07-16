const questionModel = require('../models/question');
const sphereEngineConfigs = require('../../../sphere_engine_configs.json');

module.exports = (req, res) => {
	const { questionId } = req.params;
	questionModel
		.findById(questionId)
		.then((question) => {
			if (!question) res.status(400).send('problem not found');
			else {
				const sphereEngineEndpoint = sphereEngineConfigs.sphereEngineEndpoint;
				const sphereEngineAccessToken =
					sphereEngineConfigs.sphereEngineAccessToken;
				const sphereEngineProblemId = question.sphere_engine_problem_id;
				const sphereEngineApiUrl = `https://${sphereEngineEndpoint}/problems/${sphereEngineProblemId}?access_token=${sphereEngineAccessToken}`;
				fetch(sphereEngineApiUrl, { method: 'DELETE' })
					.then((result) => {
						if (result.status == 200) {
							question.deleteOne();
							res.send('problem deleted');
						} else res.status(400).send('error deleting question');
					})
					.catch((error) => {
						console.log(error);
						res.status(500).send('error deleting question');
					});
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).send('error deleting question');
		});
};
