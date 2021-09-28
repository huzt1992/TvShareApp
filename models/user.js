const mongoose = require('mongoose')
const passportLocalMongoose= require('passport-local-mongoose')
const passport= require('passport')


const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,'Please login your email'],
        unique:true
    },

    movie:[{type:mongoose.Schema.Types.ObjectId, ref:'Movie'}],
    review:[{type:mongoose.Schema.Types.ObjectId, ref:'Review'}]
})

userSchema.plugin(passportLocalMongoose)

const User = mongoose.model('User',userSchema)
module.exports=User