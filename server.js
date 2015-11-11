
/**
 * Module dependencies
 */

var express = require('express'),
    routes = require('./routes'),
    everyauth = require('everyauth'),
    api = require('./routes/api');

var app = module.exports = express();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
    app.engine('.html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.set('view options', {
        layout: false
    });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'omgnodeworks' }));
  app.use(everyauth.middleware());
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

// Routes
app.get('/', routes.index);
app.get('/login', routes.login);
app.get('/partials/:name', routes.partials);

// JSON API

app.get('/api/posts', api.posts);

// Twitter JSON API
app.get('/api/tweetsearch/byhashtag/:hashtag', api.tweets);
app.get('/api/tweetsearch/byhandle/:hashtag', api.tweetsHandle);


appServer = app.listen(process.env.PORT || 5000, function(){
  console.log("Express server listening on port %d in %s mode", appServer.address().port, app.settings.env);
});
