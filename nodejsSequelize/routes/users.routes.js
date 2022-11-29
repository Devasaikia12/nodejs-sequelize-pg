const express = require('express');
const routes = express.Router();
const {
	addUsers,
	findUser,
	findUsers,
} = require('../controllers/UsersController');

routes.get('/', findUsers);
routes.get('/:uuid', findUser);
routes.post('/', addUsers);

module.exports = routes;
