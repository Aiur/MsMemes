
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

// Initial set up
//
var tableService = azure.createTableService();
var blobService = azure.createBlobService();
setup.setup(tableService, blobService);

// Routes
//
var r = new routes.Routes(tableService, blobService, uuid);
app.get('/', r.index);
app.get('/test', r.test.bind(r));
app.get('/debugAdd', r.debugAdd.bind(r));
app.get('/debugList', r.debugList.bind(r)); 
app.get('/test2', r.test2.bind(r));
app.get('/test3', function(req, res) { res.write('uuid' + uuid()); res.end(); });


app.listen(process.env.port, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
