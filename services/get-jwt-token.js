const jwt = require('jsonwebtoken');

const secretKey = 'your_secret_key';

const expiration = Math.floor(Date.now() / 1000) + 60 * 60 * 24;

module.exports = (_id, role) => {
	const payload = {
		exp: expiration,
		_id,
		role,
	};

	return jwt.sign(payload, secretKey);
};
