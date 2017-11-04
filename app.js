const express = require('express');
const path = require('path'); 
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

//Load models
require('./models/User');
require('./models/Story');

//Passport config
require('./config/passport')(passport);

//Load routes
const index = require('./routes/index');
const auth = require('./routes/auth');
const stories = require('./routes/stories');

//Load keys
const keys = require('./config/keys');

//Handlebars helpers
const {
    truncate,
    stripTags
} = require('/helpers/hbs');

//Map global promises
mongoose.Promise = global.Promise;
//Mongoose connect
mongoose.connect(keys.mongoURI, {
    useMongoClient:true
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err)); 

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Handlebars middleware
app.engine('handlebars', exphbs({
    helpers: {
        truncate: truncate,
        stripTags: stripTags
    },
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

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Use routes
app.use('/', index);
app.use('/auth', auth);
app.use('/stories', stories);


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port `+ port)
});
