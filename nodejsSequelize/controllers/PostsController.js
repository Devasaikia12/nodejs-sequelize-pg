const { QueryTypes } = require('sequelize');
const { Post, User, sequelize } = require('../models');
const addPost = async (req, res) => {
	const { title, body, user_id, status } = req.body;
	try {
		const data = await Post.create({ title, body, user_id, status });
		res.json(data);
	} catch (error) {
		res.status(500).json(error.message);
	}
};

const findPosts = async (req, res) => {
	try {
		const data = await Post.findAll();
		res.json(data);
	} catch (error) {
		res.status(500).json(error.message);
	}
};

const findPost = async (req, res) => {
	const uuid = req.params.uuid;
	try {
		const data = await Post.findOne({
			where: { uuid },
			include: {
				model: User,
				as: 'users',
				where: {
					role: 'admin',
				},
			},
		});
		res.json(data);
	} catch (error) {
		res.status(500).json(error.message);
	}
};

const adminPost = async (req, res) => {
	try {
		const data = await Post.findOne({
			include: {
				model: User,
				as: 'users',
				where: {
					role: 'admin',
				},
			},
		});
		res.json(data);
	} catch (error) {
		res.status(500).json(error.message);
	}
};

const getAllActivePost = async (req, res) => {
	try {
		let query = `SELECT * FROM posts p JOIN users u on p.user_id = u.uuid WHERE status IN(:status)`;
		const data = await sequelize.query(query, {
			replacements: { status: ['active'] },
			type: sequelize.QueryTypes.SELECT,
		});

		res.json(data);
	} catch (error) {
		res.status(500).json(error);
	}
};

const updatePost = async (req, res) => {
	const uuid = req.params.uuid;
	const { title, body, user_id, status } = req.body;

	const tran = await sequelize.transaction();
	try {
		const isExist = await Post.findOne(
			{ where: { uuid } },
			{ transaction: tran }
		);
		if (isExist) {
			const post = await Post.update(
				{ title, body, user_id, status },
				{
					where: { uuid },
				},
				{ transaction: tran }
			);

			await tran.commit();
			res.status(201).json(post);
		} else {
			await tran.rollback();
			res.status(404).json({ message: 'Post not found' });
		}
	} catch (error) {
		res.status(500).json(error.message);
	}
};

module.exports = {
	addPost,
	findPost,
	findPosts,
	getAllActivePost,
	adminPost,
	updatePost,
};
