'use strict';
module.exports = (sequelize, DataTypes) => {
	const Sequelize = sequelize.Sequelize;
	const Model = Sequelize.Model;
	class Task extends Model {}
	Task.init({
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			validate : {
				notEmpty: {
					msg: 'Title cannot be empty'
				}
			}
		},
		category: {
			type: DataTypes.STRING,
			allowNull: false,
			validate : {
				notEmpty: {
					msg: 'Category cannot be empty'
				}
			}
		},
		UserId: {
		type: DataTypes.INTEGER,
		validate : {
				notEmpty: true
			}
		},
	}, 
	{ sequelize });
	Task.associate = function(models) {
		Task.belongsTo(models.User)
	};
	return Task;
};