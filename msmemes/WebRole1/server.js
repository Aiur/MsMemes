
/**
 * Module dependencies.
 */
var azure = require('azure'),
    express = require('express'),
    routes = require('./routes'),
    uuid = require('node-uuid');
    

// Local dependencies
var setup = require('./startup.js');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/test', routes.test);

// Initial set up
setup.setup();

app.listen(process.env.port, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
