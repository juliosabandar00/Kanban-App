const { Router } = require('express');
const Controller = require('../controllers/TodoController');
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')
const taskRouter = Router();
taskRouter.use(authentication);
taskRouter.get('/', Controller.showTasks);
taskRouter.post('/', Controller.addTask);
taskRouter.put('/:id', authorization, Controller.editTask);
taskRouter.delete('/:id', authorization, Controller.deleteTask);
module.exports = taskRouter;