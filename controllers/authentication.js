const User = require('../models/user')

module.exports.registerShow =async (req,res,next)=>{

    res.render('register')
}


module.exports.registerPost = async (req,res,next)=>{

    // using try,catch to flash an error, rather than using generic error handler 
    try{
 
         const {username,password,email}=req.body;
     
         // register a new user 
         const rawUser = new User({username,email})
         const registeredUser = await User.register(rawUser,password)
 
         //passport method: req.login
         req.login(registeredUser,function(err){            
             if(err){return next(err)} // can't possibly be an error here
 
             //flash
             req.flash('success','welcome new user!')
 
             return res.redirect('/')
         })
         
         
    }catch(e){
 
         req.flash('error',e.message)
         res.redirect('/user/register')
 
    }
 } 
 

  
module.exports.loginShow = (req,res)=>{
    res.render('login')
}




module.exports.loginPost = async (req,res)=>{    
    req.flash('success','log in successfully')
    
    const {username} = req.body
    const user = await User.findOne({username})
    const {id} = user
    // return to previous attempting page(returnTo defined in isLogIn middleware)
    const url = req.session.returnTo || `/movie`  

    req.session.searchName= null  
    res.redirect(`${url}`)
}



module.exports.logout= (req,res,next)=>{
    //log out by calling req.logOut()
    req.logOut();
    req.flash('success','You have been successfully logged out')
    res.redirect('/')
}



module.exports.userDelete = async(req,res,next)=>{
    const{id}=req.params
    await User.findByIdAndDelete(id)
    req.flash('success','successfuly deleted!')
    res.redirect('/')
}
