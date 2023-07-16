const express = require('express');

const questionMiddleware = require('./middleware');

const getRequestHandler = require('./controllers/get');
const postRequestHandler = require('./controllers/post');
const putRequestHandler = require('./controllers/put');
const deleteRequestHandler = require('./controllers/delete');

const testcasesRouter = require('./testcases/route');
const router = express.Router();

router.use(questionMiddleware);
router.use('/:questionId/testcases', testcasesRouter);
router.get('/', getRequestHandler);
router.post('/', postRequestHandler);
router.put('/:questionId', putRequestHandler);
router.delete('/:questionId', deleteRequestHandler);

router.all('*', (req, res) => res.status(400).send('Invalid API request'));
module.exports = router;
