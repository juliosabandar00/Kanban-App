const { Task, User } = require('../models');
class taskController {
    static showTasks (req, res, next){
        Task.findAll({include: {
            model: User, 
            where: {organization : 'Hacktiv8'}
        }})
        .then((tasks)=>{
            res.status(200).json({tasks})
        })
        .catch(next);
    }
    static addTask (req, res, next){
        const {title, category} = req.body
        Task.create({title, category, UserId: req.UserId})
        .then((task)=>{
            res.status(200).json({task})
        })
        .catch(next);
    }
    static editTask (req, res, next){
        const {title, category} = req.body;
        Task.update({title, category}, {where: {id:req.params.id}})
        .then(()=>{
            return Task.findByPk(req.params.id);
        })
        .then(task =>{
            res.status(200).json({task})
        })
        .catch(next);
    }
    static deleteTask (req, res, next){
        Task.destroy({where: {id:req.params.id}})
        .then(()=>{
            res.status(200).json({message: 'Task Successfully Deleted'});
        })
        .catch(next);
    }
}
module.exports = taskController;