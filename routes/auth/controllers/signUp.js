const userModel = require('../../../models/user');

const getPasswordHash = require('../../../services/get-password-hash');
const getJwtToken = require('../../../services/get-jwt-token');

module.exports = (req, res) => {
	const { name, email, password, role } = req.body;
	userModel
		.findOne({ email })
		.then(async (result) => {
			if (result) res.send('Email already in use.');
			else {
				const hashedPassword = await getPasswordHash(password);
				new userModel({ name, email, hashedPassword, role })
					.save()
					.then(() => {
						const token = getJwtToken(email, role);
						res.json({ email, token });
					})
					.catch((error) => {
						console.log(error);
						res.status(500).send('Error while creating account.');
					});
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).send('Error while creating account.');
		});
};
