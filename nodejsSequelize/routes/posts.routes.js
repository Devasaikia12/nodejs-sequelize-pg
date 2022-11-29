const express = require('express');
const routes = express.Router();
const {
	addPost,
	findPost,
	findPosts,
	getAllActivePost,
	adminPost,
	updatePost,
} = require('../controllers/PostsController');

routes.get('/', findPosts);
routes.get('/admin_posts', adminPost);
routes.get('/active_posts', getAllActivePost);
routes.get('/:uuid', findPost);
routes.post('/', addPost);
routes.put('/:uuid', updatePost);

module.exports = routes;
