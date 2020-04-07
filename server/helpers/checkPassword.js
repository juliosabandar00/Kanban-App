const bcrypt = require('bcryptjs');
function checkPassword(password, hash, next) {
    try{
        return bcrypt.compareSync(password, hash)
    }catch(err){
        next()
    }
}
module.exports = checkPassword;