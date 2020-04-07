'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;
  class Task extends Model {}
  Task.init({
    title: {
      type: DataTypes.STRING,
      validate : {
        notEmpty: true
      }
    },
    category: {
      type: DataTypes.STRING,
      validate : {
        notEmpty: true
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      validate : {
        notEmpty: true
      }
    },
  }, {sequelize})
  Task.associate = function(models) {
    Task.belongsTo(models.User)
  };
  return Task;
};