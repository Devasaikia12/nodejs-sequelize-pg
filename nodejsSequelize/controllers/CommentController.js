const { Comment, User, Post, sequelize } = require('../models');
const allComments = async (req, res) => {};
const addComment = async (req, res) => {};
const addUserPostComment = async (req, res) => {
	const { name, email, role, title, body, status, comment } = req.body;

	try {
		const result = await sequelize.transaction(async (t) => {
			const user = await User.create({ name, email, role }, { transaction: t });
			if (user) {
				const post = await Post.create(
					{
						title,
						body,
						user_id: user.uuid,
						status,
					},
					{ transaction: t }
				);
				if (post) {
					const data = await Comment.create(
						{
							comment,
							user_id: user.uuid,
							post_id: post.uuid,
						},
						{ transaction: t }
					);

					return data;
				}
			}
		});
		if (!result) {
			return res.status(400).json({ message: 'Something went wrong' });
		}
		res.status(201).json({ message: 'Records inserted sucessfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = { addUserPostComment, addComment, allComments };
