
const User = require('../models/user')
const Movie = require('../models/movie')
const Review = require('../models/review')


const appError = require('../utils/appError')
const axios= require('axios')


module.exports.isLogIn =  function(req,res,next){

    if(!req.isAuthenticated()){
        req.flash('error','You have to log in first')
        req.session.returnTo=req.originalUrl
        return res.redirect('/user/login')
    }
    next()
}


module.exports.movieShow =async(req,res,next)=>{

    //using axios to search for results
const searchRes = await axios.get(`https://api.tvmaze.com/search/shows?q=${req.session.searchName}`)
const search = searchRes.data
req.session.searchName=null
// showing existing data base movie
res.render('movie',{search})
}



module.exports.movieAdd =async (req,res,next)=>{

    const {id} = req.params

    const username = req.user.username
    const user = await User.findOne({username})

    const movie = new Movie(req.body)

    movie.user=user
    user.movie.push(movie)

    await movie.save()
    await user.save()

}





module.exports.movieSearch =async (req,res,next)=>{
    const {name} = req.body
    req.session.searchName=name
    res.redirect(`/movie`)
}





module.exports.userMovie=async (req,res,next)=>{

    const {id} = req.params
    const theUser = await User.findById(id).populate('movie')
    res.render('usermovie',{theUser})
}




module.exports.userMovieDelete =async (req,res,next)=>{

    const {id,m_id}=req.params
    await User.findByIdAndUpdate(id,{$pull:{movie:m_id}})
    await Movie.findByIdAndDelete(m_id)
    req.flash('success','Movie Deleted!')
    res.redirect(`/movie/user/${id}`)
}




module.exports.movieInfo = async (req,res,next)=>{
    const {id,m_id}=req.params;
    const movie= await Movie.findById(m_id).populate({
        path:'review',
        model:'Review',
        populate:{
            path:'user',
            model:'User'
        }
    })
    

    res.render('movieInfo',{id,movie})
}



module.exports.movieReviewPost = async (req,res,next)=>{

    const {id,m_id}=req.params;

    const user = await User.findById(id)
    const movie = await Movie.findById(m_id)
    const review = new Review(req.body)

    user.review.push(review)
    movie.review.push(review)
    review.user = user
    review.movie=movie

    await review.save()
    await user.save()
    await movie.save()

    res.redirect(`/movie/${id}/movieInfo/${m_id}`)
}




module.exports.isAuthorized = async(req,res,next)=>{
    const {id,m_id,r_id}=req.params;
    const  review =  await Review.findById(r_id).populate('user')
    if(req.user.username!== review.user.username ){
        res.redirect(`/movie/${id}/movieInfo/${m_id}`)
    }else{next()} 
}





module.exports.movieReviewDelete =async (req,res,next)=>{

    const {id,m_id,r_id}=req.params;

    await User.findByIdAndUpdate(id,{$pull:{review:r_id}}) 
    await Movie.findByIdAndUpdate(m_id,{$pull:{review:r_id}})
    await Review.findByIdAndDelete(r_id)
    req.flash('success','Review Deleted!')
    res.redirect(`/movie/${id}/movieInfo/${m_id}`)  

}

