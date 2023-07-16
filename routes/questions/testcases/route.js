const express = require('express');
const postHandler = require('./controllers/post');

const router = express.Router({ mergeParams: true });

router.post('/', postHandler);

module.exports = router;
