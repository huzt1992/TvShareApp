const express= require('express')
const passport = require('passport')
const User = require('../models/user')
const Router = express.Router()
const {catchAsync}= require('../utils/catchAsync')
const {registerShow,registerPost,loginShow,loginPost,logout,userDelete,
loginFlash
}=require('../controllers/authentication.js')



Router.route('/register').
    get(registerShow).
    post(catchAsync(registerPost))


Router.route('/login')
    .get(loginShow)
    .post( passport.authenticate('local',{failureFlash:true,failureRedirect:'/user/login'}),loginPost)


Router.get('/logout',logout)



Router.get('/login/request',loginFlash)


Router.delete('/:id',userDelete)


module.exports=Router