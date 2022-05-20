const express=require('express');

const router=express.Router();
const postApi=require('../../../controllers/api/v1/post_api');
const passport=require('passport');


router.get('/',postApi.index);
router.delete('/:id',passport.authenticate('jwt',{session:false}),postApi.destroy);
//session is done false because i donot want session cookie to be generated.
//authentication check over passport
//if token is wrong or not there. then it will UNAUTHORIZED.



//note authenticate and autherize are different things.
module.exports=router;