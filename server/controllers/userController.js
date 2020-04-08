const { User } = require('../models');
const checkPassword = require('../helpers/checkPassword');
const hashPassword = require('../helpers/hashPassword');
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
class UserController {
    static register(req, res, next){
        User.create({
            email : req.body.email,
            password : hashPassword(req.body.password, next)
        })
        .then( user => {
            res.status(201).json({user});
        })
        .catch(next);
    }
    static login(req, res, next){
        console.log(req.body)
        let input = req.body;
        User.findOne({where : {email : input.email}})
		.then( user => {
			if(user){
				if(checkPassword(input.password, user.password, next)){
					const access_token = jwt.sign({
						userId : user.id,
						email : user.email
					}, process.env.JWT_SECRETKEY);
					res.status(201).json({access_token});
				}else{
					throw new Error('Incorrect Email/Password');
				}
			}else{
				throw new Error('Incorrect Email/Password');
			}
		})
        .catch(next);
    }
    static loginGoogle(req,res,next){
        const token = req.body.token;
        const userData = {}
        client.verifyIdToken({
          	idToken:token,
          	audience: process.env.GOOGLE_CLIENT_ID
        })
        .then(data=>{
          	const payload = data.getPayload();
          	userData.email = payload.email;
          	userData.password = hashPassword('randomPassword');
           	return User.findOne({where: {email: payload.email}});
        })
        .then(user=>{
			return user ? user : User.create(userData);
        })
        .then(theUser=>{
        	const access_token = jwt.sign({
            	userId : theUser.id,
            	email: theUser.email
          	}, process.env.JWT_SECRETKEY);
          	res.status(200).json({access_token})
        })
        .catch(next);
    }
}
module.exports = UserController;
