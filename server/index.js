var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var compression = require('compression');

var app = express();

app.use(cors());
pp.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression()); // Compress all routes

const routes = require('./routes'); //Import routes for "server"
app.use('/', routes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public/'));
    app.get(/.*/, (request, response) => response.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));

/* Potential Error handling
app.use(function(request, response, next) {
    next(createError(404));
  });

app.use(function(err, request, response, next) {
// set locals, only providing error in development
    response.locals.message = err.message;
    response.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    response.status(err.status || 500);
    response.render('error');
});
*/
