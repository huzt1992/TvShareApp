const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/authPassport', {
    useNewUrlParser: true,
    useUnifiedTopology: true
    });
    
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () => {
        console.log("Database connected");
    });


const Movie= require('./models/movie')
const Review= require('./models/review')
const User= require('./models/review')


const dbKill = async()=>{
    await Movie.deleteMany({})
    await Review.deleteMany({})
}

dbKill()


