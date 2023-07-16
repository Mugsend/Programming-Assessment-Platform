const questionModel = require('../../models/question');
const sphereEngineConfigs = require('../../../../sphere_engine_configs');
module.exports = (req, res) => {
	const { questionId } = req.params;
	questionModel
		.findById(questionId)
		.then((result) => {
			if (!result) res.status(400).send('Problem not found');
			else {
				const { input, output, timeLimit } = req.body;
				const sphereEngineEndpoint = sphereEngineConfigs.sphereEngineEndpoint;
				const sphereEngineAccessToken =
					sphereEngineConfigs.sphereEngineAccessToken;
				const sphereEngineProblemId = result.sphere_engine_problem_id;
				const sphereEngineApiUrl = `https://${sphereEngineEndpoint}/problems/${sphereEngineProblemId}/testcases?access_token=${sphereEngineAccessToken}`;
				const data = {
					input,
					output,
					timeLimit,
					judgeId: 1,
				};
				fetch(sphereEngineApiUrl, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				})
					.then(async (result) => {
						if (result.status == 201) res.send('Testcase added');
						else res.status(400).send('Error adding testcase');
					})
					.catch((error) => {
						console.log(error);
						res.status(500).send('Error adding testcase');
					});
			}
		})
		.catch((error) => {
			console.debug(error);
			res.status(500).send('Error while adding testcase');
		});
};
