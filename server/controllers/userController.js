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
            password : req.body.password
        })
        .then( user => {
            res.status(201).json({user});
        })
        .catch(err => {
            next(err)
        });
    }
    static login(req, res, next){
        let input = req.body;
        User.findOne({where : {email : input.email}})
            .then( user => {
                if(!user){
                    res.status(400).json({message : 'Invalid Email/Password'});
                }else{
                    if(checkPassword(input.password, user.password)){
                        const accessToken = jwt.sign({
                            userId : user.id,
                            email : user.email
                        }, process.env.JWT_SECRETKEY);
                        res.status(201).json({accessToken});
                    }else{
                        res.status(400).json({message : 'Invalid Email/Password'});
                    }
                }
            })
            .catch(err => {
                next(err);
            });
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
          userData.password = hashPassword('randomPassword')
           return User.findOne({
            where:{
              email: payload.email
            }
          })
        })
        .then(user=>{
          if(user){
            return user
          }else{
            return User.create(userData)
          }
        })
        .then(theUser=>{
          const accessToken = jwt.sign({
            userId : theUser.id,
            email: theUser.email
          }, process.env.JWT_SECRETKEY)
          res.status(200).json({accessToken})
        })
        .catch(err=>{
          next(err);
        })
    }
}
module.exports = UserController;
