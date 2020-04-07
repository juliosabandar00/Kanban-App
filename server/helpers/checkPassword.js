const bcrypt = require('bcryptjs');
function checkPassword(password, hash, next) {
    try{
        return bcrypt.compareSync(password, hash)
    }catch(err){
        // res.status(500).json({message: err.message})
        next(err);
    }
}
module.exports = checkPassword;