'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Post extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ User, Comment }) {
			// define association here
			this.belongsTo(User, {
				foreignKey: 'user_id',
				targetKey: 'uuid',
				as: 'users',
			});

			this.hasMany(Comment, { foreignKey: 'post_id', sourceKey: 'uuid' });
		}
		toJSON() {
			return {
				...this.get(),
				id: undefined,
				createdAt: undefined,
				updatedAt: undefined,
			};
		}
	}
	Post.init(
		{
			uuid: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			body: {
				type: false,
				allowNull: false,
			},
			status: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			user_id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
			},
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
			tableName: 'posts',
			modelName: 'Post',
		}
	);
	return Post;
};
