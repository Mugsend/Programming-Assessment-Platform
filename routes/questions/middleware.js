const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key';
module.exports = (req, res, next) => {
	const token = req.headers.authorization;
	try {
		const decoded = jwt.verify(token, secretKey);
		const role = decoded.role;
		if (role === 'admin') {
			req.author_id = decoded._id;
			next();
		} else res.send('Not authorized for this route');
	} catch (error) {
		console.log(error);
		res.status(401).json({ error: 'Invalid token' });
	}
};
