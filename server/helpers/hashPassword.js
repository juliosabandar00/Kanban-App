const bcrypt = require('bcryptjs')
function hashPassword(password, next) {
    try {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        return hash;
    } catch(err) {
        // res.status(500).json({message: err.message})
        next(err);
    }
}
module.exports = hashPassword;