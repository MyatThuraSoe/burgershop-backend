const express = require('express');
const route = express.Router()

const controller = require('./controller');

/**
 *  @description Root Route
 *  @method GET /
 */

// API
route.get('/session', controller.getSession);
route.post('/order', controller.postOrder);
route.post('/feedback',controller.postFeedback);


module.exports = route