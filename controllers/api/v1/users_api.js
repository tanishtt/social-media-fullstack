const User=require('../../../models/user');
const jwt=require('jsonwebtoken');

module.exports.createSession=async function(req,res)
{
    //whenever user name and password is received, we need to find that user and generates associated web token corresponding to it.
    try{
    let user=await User.findOne({email:req.body.email});
    if(!user||user.password!=req.body.password)
    {
        return res.status(422).json({
            message:"invalid username or password"
        });
    }

//find the user by email, if password match we will return status and message along with a token with help of jwtLibrary
    return res.json(200,{
        message:"sign in successfull, here is your token please keep it safe",
        data:{
            token:jwt.sign(user.toJSON(),'thisIsKey',{expiresIn:'100000'})
        }
    })
    //this token we are going to use very soon just to authenticate the user for other request
    }
    catch(err)
    {
        console.log(err,'*******');
        return res.json(500,{
            message:"internal server error--"
        });
    }
}

