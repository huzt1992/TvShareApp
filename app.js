
if(process.env.NODE_ENV !=="production"){
    require('dotenv').config()
}

const dbUrl = process.env.db_url || 'mongodb://localhost:27017/movieHunt';



const express= require('express')
const app = express()
const mongoose= require('mongoose')
const ejsMate=require('ejs-mate')
const path = require('path');
const methodOverride= require('method-override')
const session=require('express-session')
const flash = require('connect-flash')

const MongoStore =require('connect-mongo')




app.engine('ejs',ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))




// 'mongodb://localhost:27017/authPassport'

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    });
    
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () => {
        console.log("Database connected");
    });





app.use(session({
    store: MongoStore.create({
        mongoUrl:dbUrl
    }),
    secret:'itshouldbeabettersecret',
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now() + 1000 * 60 * 60,    // expire every 60 minutes

        maxAge: 1000 * 60 * 60,
        httpOnly:true,
    }
}))
app.use(flash())





//*********** PASSPORT SET UP ************//

//$ npm install passport mongoose passport-local-mongoose
//Require Model First
const User = require('./models/user')    
const Review = require('./models/review')    
const Movie = require('./models/movie')    

//passport and passport-local require
const passport= require('passport')
const LocalStrategy = require('passport-local')

//passport.session has to be placed after app.use(session(config))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//************************************//



const appError = require('./utils/appError')




const authenRoute = require('./routes/authentication')
const movieRoute = require('./routes/movie')





app.use((req,res,next)=>{
    // req.user: passport method
    res.locals.user=req.user

    res.locals.success=req.flash('success')
    res.locals.error=req.flash('error')
    next()
})

 

app.use('/user',authenRoute)
app.use('/movie',movieRoute)


// Main Page
app.get('/', async (req,res,next)=>{
    const movies = await Movie.find().populate('user')
    res.render('home',{movies})
})



// // Test

// app.get('/test', (req,res,next)=>{
//     res.render('test')
// })




// app.post('/test2', (req,res,next)=>{
//     console.log(req.body)
//     res.send(req.body)
// })




/*****************Error Handling ****/



app.use('*',(req,res,next)=>{
    const err = new appError(500,'please visit valid page')
    next(err)
})

app.use((err,req,res,next)=>{
    const{status=500,message='something went wrong'}=err;
    res.status(status).render('error',{err})
})


const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`PROTAL ${port} IS INITIATED`)
})