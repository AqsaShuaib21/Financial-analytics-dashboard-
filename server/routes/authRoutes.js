const express=require('express');
const router=express.Router();
// register route
 router.post('/register',(req,res)=>{
  res.json({token:"dummy-token"});
 });
//  login route
router.post("/login",(req,res)=>{
  res.json({token:"dummy-token"});
});
module.exports=router;
