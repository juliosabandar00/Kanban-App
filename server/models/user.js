'use strict';
module.exports = (sequelize, DataTypes) => {
	const Sequelize = sequelize.Sequelize;
	const Model = Sequelize.Model;
	class User extends Model {}
	User.init({
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate : {
				notEmpty: {
					msg: 'Email cannot be empty'
				}
			}
		},
		organization: {
			type: DataTypes.STRING,
			validate : {
				notEmpty: {
					msg: 'Organization cannot be empty'
				}
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate : {
				notEmpty: {
					msg: 'Password cannot be empty'
				}
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