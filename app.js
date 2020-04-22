const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
//const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');
const {MongoClient} = require('mongodb');


//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';

//Initiate our app
const app = express();

//Configure our app
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/client/build')));
//app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
console.log(process.env.NODE_ENV);

if(!isProduction) {
  app.use(errorHandler());
  mongoose.connect('mongodb://localhost/us-dv');
}else{
  mongoose.connect('mongodb+srv://developer:Paris2020!@cluster0-e6pdk.mongodb.net/', {dbName: 'us-dv'});
}

// app.get('*', function(request, response) {
//   response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
// });

//Configure Mongoose
//mongoose.connect('mongodb+srv://developer:London2020@cluster0-8wbi3.mongodb.net/', {dbName: 'maldives-converter'});

//mongoose.connect('mongodb://developer:London2020@cluster0-8wbi3.mongodb.net/maldives-converter?retryWrites=true&w=majority');

mongoose.set('debug', true);
//Models & routes
require('./models/Payments');

require('./models/Users');
require('./models/Converters');
require('./config/passport');
app.use(require('./routes'));
app.get('*', (req, res) => {
  console.log(req)

  console.log("xxxxxxx3")
  // if(req.originalUrl.includes("ImmiEx") || req.originalUrl === "/" || req.originalUrl === undefined){
  //   app.use(express.static(path.join(__dirname, '/immiEx/HTML/website', 'index.html')))

  //   res.sendFile(path.join(__dirname, req.originalUrl))

  // }else{
  //     console.log("xxxxxxx2")

    app.use(express.static(path.join(__dirname, '/client/build', 'index.html')))

    res.sendFile(path.join(__dirname, '/client/build', 'index.html'))

  // }
})
//Error handlers & middlewares
if(!isProduction) {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});
app.listen(process.env.PORT || 8000);