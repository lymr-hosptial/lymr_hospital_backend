const server = require('express');
const userAuthenticaton = require('./userauth');
const router = server.Router();

router.use('/userauth', userauth);

module.exports = router;