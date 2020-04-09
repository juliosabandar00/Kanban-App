function errorHandler (err, req, res, next) {
    if(err){
        if(err.message == 'Incorrect Email/Password'){
            res.status(400).json({message : 'Incorrect Email Password'});
        }
        else if(err.name == 'SequelizeValidationError'){
            let message = err.errors.map(error =>  error.message);
            res.status(401).json({message : message});
        }else{
            res.status(500).json({message : 'Internal Server Error'});
        }
    }
}
module.exports = errorHandler;