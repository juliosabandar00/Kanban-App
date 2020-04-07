const bcrypt = require('bcryptjs')
function hashPassword(password, next) {
    try {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        return hash;
    }catch(err){
        next()
    }
}
module.exports = hashPassword;