const passport=require('passport');
const { ExtractJwt } = require('passport-jwt/lib');
const JWTstrategy=require('passport-jwt').Strategy;
const extractJWT=require('passport-jwt').ExtractJwt;

const User=require('../models/user');
//while defining jwt-strategy we need to have some option
//1.encrypt
//a key is to be present to encrypt any text and decrypt that.


let opts={
    //this method will create a new extractor that look for authorization header with bearer
    //find the user from header and decrypt that using header.
    jwtFromRequest:extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:"thisIsKey",


}

passport.use(new JWTstrategy(opts,function(jwtPayload,done){
    User.findById(jwtPayload._id,function(err,user){
        if(err)
        {
            console.log('error in finding user from JWT',err);
            return;
        }
        if(user)
        {
            return done(null,user);
        }
        else{
            return done(null,false);
        }
    })
}));



module.exports=passport;
//jsonwebtoken regenarates the token.....
