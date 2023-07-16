const questionModel = require('../models/question');
const sphereEngineConfigs = require('../../../sphere_engine_configs.json');
module.exports = (req, res) => {
	const { name, body } = req.body;
	const sphereEngineEndpoint = sphereEngineConfigs.sphereEngineEndpoint;
	const sphereEngineAccessToken = sphereEngineConfigs.sphereEngineAccessToken;
	const sphereEngineApiUrl = `https://${sphereEngineEndpoint}/problems?access_token=${sphereEngineAccessToken}`;
	const data = {
		name,
		masterjudgeId: 1001,
	};

	fetch(sphereEngineApiUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
		.then((response) => {
			if (response.status === 201) {
				response
					.json()
					.then((result) => {
						const authorId = req.author_id;
						const sphereEngineProblemId = result.id;
						new questionModel({
							name,
							body,
							sphere_engine_problem_id: sphereEngineProblemId,
							author_id: authorId,
						})
							.save()
							.then((result) => res.json({ question_id: result.id }))
							.catch((error) => {
								console.log(error);
								res.status(500).send('Error while adding question');
							});
					})
					.catch((error) => {
						console.log(error);
						res.status(500).send('Error while adding question');
					});
			} else {
				res.status(400).send('Error while adding question');
			}
		})
		.catch((error) => {
			console.error(error);
			res.status(500).send('Error while adding question');
		});
};
