'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ Post, Comment }) {
			// define association here
			this.hasMany(Post, {
				foreignKey: 'user_id',
				sourceKey: 'uuid',
			});
			this.hasMany(Comment, { foreignKey: 'user_id', sourceKey: 'uuid' });
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
	User.init(
		{
			uuid: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				unique: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			role: {
				type: DataTypes.STRING,
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
			tableName: 'users',
			modelName: 'User',
		}
	);
	return User;
};
