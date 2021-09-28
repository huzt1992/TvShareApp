const express= require('express')

const User = require('../models/user')
const Movie = require('../models/movie')
const Review = require('../models/review')


const appError = require('../utils/appError')
const axios= require('axios')

const {catchAsync}=require('../utils/catchAsync')
const Router = express.Router({mergeParams:true})


const{movieShow,movieAdd,movieSearch,userMovie,userMovieDelete,movieInfo,movieReviewPost,movieReviewDelete,isLogIn,isAuthorized} = require('../controllers/movie')

Router.route('/')
    .get(catchAsync(movieShow))
    .post(isLogIn,catchAsync(movieAdd))


// Router.get('/',movieShow)

// Router.post('/',isLogIn,movieAdd)


Router.post('/search',movieSearch)

Router.get('/user/:id',isLogIn,userMovie)

Router.route('/:id/movieInfo/:m_id')
    .get(catchAsync(movieInfo))
    .post(isLogIn,catchAsync(movieReviewPost))
    .delete(isLogIn,catchAsync(userMovieDelete))


// Router.get('/:id/movieInfo/:m_id',movieInfo)

// Router.delete('/:id/movieInfo/:m_id',isLogIn,userMovieDelete)

// Router.post('/:id/movieInfo/:m_id',isLogIn,movieReviewPost)



Router.delete('/:id/movieInfo/:m_id/review/:r_id',isLogIn,isAuthorized,movieReviewDelete)



module.exports=Router


