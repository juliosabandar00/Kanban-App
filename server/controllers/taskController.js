const { Task } = require('../models');
class taskController {
    static showTasks (req, res, next){
        Task.findAll({include: User, where: {organization : 'Hacktiv8'}})
        .then((tasks)=>{
            res.status(200).json({tasks})
        })
        .catch(err=>{
            next(err);
        })
    }
    static addTask (req, res, nest){
        const {title, category} = req.body
        Task.create({title, category, UserId: req.UserId})
        .then((task)=>{
            res.status(200).json({task})
        })
        .catch(err=>{
            next(err);
        });
    }
    static editTask (req, res, next){
        const {title, category} = req.body;
        Task.update({title, category}, {where: {id:req.params.id}})
        .then((task)=>{
            res.status(200).json({task});
        })
        .catch(err=>{
            next(err);
        });
    }
    static deleteTask (req, res, next){
        Task.destroy({where: {id:req.params.id}})
        .then((task)=>{
            res.status(200).json({message: 'Task Successfully Deleted'});
        })
        .catch(err=>{
            next(err);
        });
    }
}

module.exports = taskController;