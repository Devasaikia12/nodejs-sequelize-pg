'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('posts', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			uuid: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
			},
			title: {
				type: DataTypes.STRING,
			},
			body: {
				type: DataTypes.STRING,
			},
			user_id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				references: {
					model: 'users',
					key: 'uuid',
				},
			},
			status: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			created_at: {
				allowNull: false,
				type: DataTypes.DATE,
			},
			updated_at: {
				allowNull: false,
				type: DataTypes.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('posts');
	},
};
