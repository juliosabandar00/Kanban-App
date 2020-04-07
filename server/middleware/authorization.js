const { Task } = require('../models');
function authorization (req, res, next){
    Task.findByPk(req.params.id)
        .then( task => {
            if(!task){
                res.status(404).json({message: 'Task not found'})
            }else{
                if(task.UserId == req.UserId){
                    next();
                }else{
                    res.status(400).json({message: 'Access Forbidden'})
                }
            }
        })
        .catch( err => {
            res.status(500).json({message: err.message});
        });
}
module.exports = authorization;