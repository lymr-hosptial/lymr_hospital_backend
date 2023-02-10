const express = require('express');
const userAuthController = require('../controllers');
const lymr_router = express.Router();
module.exports = lymr_router;

lymr_router.get('/authentication/:username', userAuthController);