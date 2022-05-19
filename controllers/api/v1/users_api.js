const User=require('../../../models/user');
const jwt=require('jsonwebtoken');

module.exports.createSession=async function(req,res)
{
    //whenever user name and password is received, we need to find that user and generates associated web token corresponding to it.
    try{
    let user=await User.findOne({email:req.body.email});
    if(!user||user.password!=req.body.password)
    {
        return res.json(422,{
            message:"invalid username or password"
        });
    }

//find the user by email, if ppassword match we will return status and message along with a token with help of jwtLibrary
    return res.json(200,{
        message:"sign in successfull, here is your token please keep it safe",
        data:{
            token:jwt.sign(user.toJSON(),'thisIsKey',{expiresIn:'10000'})
        }
    })
    }
    catch(err)
    {
        console.log(err,'*******');
        return res.json(500,{
            message:"internal server error--"
        });
    }
}

