const userModel = require('../../../models/user');
const comparePasswordHash = require('../../../services/compare-password-hash');
const getJwtToken = require('../../../services/get-jwt-token');

module.exports = (req, res) => {
	const { email, password } = req.body;

	userModel
		.findOne({ email }, { hashedPassword: 1, role: 1 })
		.then(async (result) => {
			if (result) {
				const _id = result._id;
				const role = result.role;
				const hashedPassword = result.hashedPassword;
				comparePasswordHash(password, hashedPassword)
					.then((result) => {
						if (result) {
							const token = getJwtToken(_id, role);
							res.json({ email, token });
						} else res.send('wrong creds.');
					})
					.catch((error) => {
						console.log(error);
						res.send('error while loggin in');
					});
			} else {
				res.send('wrong creds.');
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).send('error while loggin in.');
		});
};
