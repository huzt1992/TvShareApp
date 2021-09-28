const mongoose = require('mongoose')

const reviewSechema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    movie:{type:mongoose.Schema.Types.ObjectId, ref:'Movie'},
    rating:Number,
    body:String    
})



const Review= mongoose.model('Review',reviewSechema)

module.exports=Review