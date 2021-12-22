const express = require('express') ;
const cookieParser = require('cookie-parser') ;
const port = 4000 ;
const app = express() ;

const routes = require('./routes/home') ;
app.use(express.urlencoded()) ;
app.use(cookieParser()) ; 
app.use(express.static('assets'))

const db = require('./config/mongoose') ;

const session = require('express-session') ;
const passport = require('passport') ;
const passportLocal = require('./config/passport-local-strategy');

const MongoStore = require('connect-mongo') ;

app.set('view engine' , 'ejs') ;
app.set('views' , './views') ;

app.use(session({
    name : 'codeiel',
    secret :'blahsomething',
    saveUninitialized :false ,
    resave :false ,
    cookie : {
        maxAge : (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://shiv:MukulSona4747@cluster0.w1ogn.mongodb.net/Hackvoucher_collection',
        collectionName:'sessions' // See below for details
      })
    
})) ;
app.use(passport.initialize()) ;
app.use(passport.session()) ; 

app.use(passport.setAuthenticatedUser) ;

app.use('/' , require('./routes/home')) ;
app.use('/' , require('./routes/coupon')) ;
app.listen(port , (err) =>{
    if(err) {
        console.log('Error at liten') ;
    }
}) ;
