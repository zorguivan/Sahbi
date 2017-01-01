var express = require('express');
var bcrypt = require('bcrypt-nodejs');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var flash    = require('connect-flash');

var app = express();
var http = require('http').Server(app);

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({secret: 'ilovescotchscotchyscotchscotch'})); // session secret
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static(path.join(__dirname, 'client/bower_components')));

var connection = mysql.createConnection({host: "localhost", user: "root", password: "josefx32", database: "keeper"});

connection.config.queryFormat = function(query, values) {
    if (!values)
        return query;
    return query.replace(/\:(\w+)/g, function(txt, key) {
        if (values.hasOwnProperty(key)) {
            return this.escape(values[key]);
        }
        return txt;
    }.bind(this));
};

var tracker = require('./server/modules/tracker/module.js')(app);

var ProjectsProvider = require('./server/modules/tracker/provider/ProjectsProvider');
var SessionsProvider = require('./server/modules/tracker/provider/SessionsProvider');
var NotesProvider = require('./server/modules/tracker/provider/NotesProvider');
var TodosProvider = require('./server/modules/tracker/provider/TodosProvider');

SessionsProvider.setConnection(connection);
ProjectsProvider.setConnection(connection);
NotesProvider.setConnection(connection);
TodosProvider.setConnection(connection);

var router = express.Router();
tracker.activateRoutes(router);
app.use(router);

app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname + '/login.html'));
});



function isLoggedIn(req, res, next) {
  console.log('Checking if logged');
      // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}

app.post('/login', passport.authenticate('local', {
    successRedirect: '/', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));

passport.serializeUser(function(user, done) {
  console.log('Serializing user');
    console.log(user.id)
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
  console.log('De-Serializing user');

    var query = "SELECT * FROM users where id = :id";
    connection.query(query, {
        id: id
    }, function(err, res) {
      console.log('Deserializing');
        console.log(res[0]);
        done(err, res[0]);
    });
});
passport.use('local', new LocalStrategy({
    usernameField: 'username', passwordField: 'password', passReqToCallback: true // allows us to pass back the entire request to the callback
}, function(req, username, password, done) { // callback with email and password from our form
    console.log('Authenticating users');
    console.log(username, password);
    var query = "SELECT * from users where username = :username AND password = :password";
    connection.query(query, {
        username: username,
        password: password
    }, function(err, res) {
        if (err) {
            console.log(err);
            return done(err);
        }
        console.log(res);
        console.log(res[0]);
        return done(null, res[0]);
    });
}));


app.use('/api', isLoggedIn, function(req, res) {
    res.redirect('/login');
});

app.get('*', isLoggedIn, function(req, res) {
    res.redirect('/');
});
router.get('', isLoggedIn, function(req, res, next) {
    res.redirect('/');
});
// router.use('/',isLoggedIn, function(req, res, next){
//     res.redirect('/');
// });


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({error: err})
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({error: err})
});

http.listen(80, function() {
    console.log('listening on *:3000');
});

module.exports = app;
