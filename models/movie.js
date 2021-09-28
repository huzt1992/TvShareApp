const mongoose= require('mongoose')

const movieSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Please provide movie name']
    },

    date:String,
    image:String,
    review:[{type:mongoose.Schema.Types.ObjectId,ref:'Review'}],
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
})


const Movie = mongoose.model('Movie',movieSchema)

module.exports= Movie