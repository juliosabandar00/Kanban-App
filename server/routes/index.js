const {Router} = require('express')
const router = Router();
const userRouter = require('./userRouter');
const taskRouter = require('./taskRouter');
const errorHandler = require('../middleware/errorHandler')
router.use('/', userRouter);
router.use('/task', taskRouter);
router.use(errorHandler)
module.exports = router