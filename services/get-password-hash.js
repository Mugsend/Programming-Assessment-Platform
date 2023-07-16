const bcrypt = require('bcrypt');

module.exports = (password) => {
	const saltRounds = 10;
	return bcrypt.hash(password, saltRounds);
};
