//npm install passport-google-oauth and crypto
//as after callback from google. application checks if user is present or not, if not
//then it will create user and password in its own database. as password find is rewuired.
//we will use crypto to make random password in application's database.

const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');

const User=require('../models/user');


passport.use(new googleStrategy({
    clientID:"234422639106-n83d7aeoq6ro3cblrn6t53s0p67g333c.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:8000/users/auth/google/callback"
    },//access token is just like jwt token with information in header,google also generates an access token...
    //if your access token is expired, using refresh token you request a new access token...//access token with permission 
    function(accessToken,refreshToken,profile,done){
        //find a user
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err)
            {
                console.log('error in google strategy passport',err);
                return;
            }
            console.log(profile);
            if(user)
            {
                //if found
                return done(null,user);
            }
            else{

                //if not found,create the user and set it as req.user in system(application's database);
                
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err)
                    {
                        console.log('error in creating user google strategy passport',err);
                        return;
                    }
                    return done(null,user);

                });
            }
        })
    }
))





module.exports=passport;



