const express = require('express');
const routes = express.Router();
const {
	allComments,
	addUserPostComment,
} = require('../controllers/CommentController');

routes.get('/', allComments);
routes.post('/', addUserPostComment);

module.exports = routes;
