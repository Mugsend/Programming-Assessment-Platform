const express = require('express');

const port = 3000;
const app = express();

const dbConnect = require('./services/db-connect');
const signIn = require('./routes/auth/controllers/signIn');
const signUp = require('./routes/auth/controllers/signUp');
const questionRouter = require('./routes/question/route');

app.use(express.json());

app.use('/api/question', questionRouter);

app.post('/api/signIn', (req, res) => signIn(req, res));
app.post('/api/signUp', (req, res) => signUp(req, res));

app.listen(port, async () => {
	await dbConnect();
	console.log(`listening on port ${port}..`);
});
