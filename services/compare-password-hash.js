const bcrypt = require('bcrypt');

module.exports = (plainPassword, storedHashedPassword) =>
	bcrypt.compare(plainPassword, storedHashedPassword);
