'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Comment extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ User, Post }) {
			this.belongsTo(User, { foreignKey: 'user_id', targetKey: 'uuid' });
			this.belongsTo(Post, { foreignKey: 'post_id', targetKey: 'uuid' });
		}
	}
	Comment.init(
		{
			comment: DataTypes.STRING,
			createdAt: {
				type: DataTypes.DATE,
				field: 'created_at',
			},

			updatedAt: {
				type: DataTypes.DATE,
				field: 'updated_at',
			},
		},
		{
			sequelize,
			tableName: 'comments',
			modelName: 'Comment',
		}
	);
	return Comment;
};
