'use strict';
module.exports = (sequelize, DataTypes) => {
	const Sequelize = sequelize.Sequelize;
	const Model = Sequelize.Model;
	class User extends Model {}
	User.init({
		email: {
		type: DataTypes.STRING,
		validate : {
				notEmpty: true
			}
		},
		organization: {
		type: DataTypes.STRING,
		validate : {
				notEmpty: true
			}
		},
		password: {
		type: DataTypes.STRING,
		validate : {
				notEmpty: true
			}
		}
	},
	{
		hooks: {
			beforeCreate: (task, option) => {
				task.organization = 'Hacktiv8';
			}
		},
		sequelize
	})
	User.associate = function(models) {
		User.hasMany(models.Task)
	};
	return User;
};