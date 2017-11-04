const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

//Load User Model
require('./models/User');

//Passport config
require('./config/passport')(passport);

//Load routes
const index = require('./routes/index');
const auth = require('./routes/auth');

//Load keys
const keys = require('./config/keys');

//Map global promises
mongoose.Promise = global.Promise;
//Mongoose connect
mongoose.connect(keys.mongoURI, {
    useMongoClient:true
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err)); 

const app = express();

//Handlebars middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));    

app.set('view engine', 'handlebars');

//Passport middleware
app.use(cookieParser());
app.use(session({
    secret: 'secret', 
    resave: true, //false
    saveUninitialized: true //false
}));

app.use(passport.initialize());
app.use(passport.session());


//Set global vars
app.use((req, res, next)=> {
    res.locals.user = req.user || user;
    next();
});

//Use routes
app.use('/', index);
app.use('/auth', auth);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port `+ port)
});
