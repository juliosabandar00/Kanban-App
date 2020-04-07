const jwt = require('jsonwebtoken');
function authentication(req, res, next){
    const access_token = req.headers.access_token;
    try{
        if(!access_token){
            res.status(404).json({message: 'token not not found'})
        }else{
            const decoded = jwt.verify(access_token, process.env.JWT_SECRETKEY);
            req.UserId = decoded.userId;
            req.Email = decoded.email;
            next();
        }
    }catch(err){
        res.status(500).json({message : err.message});
    }
}
module.exports = authentication;