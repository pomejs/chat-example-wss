var fs = require('fs');
var pome = require('pome');
var routeUtil = require('./app/util/routeUtil');
var filterUtil = require('./app/util/filterUtil');

/**
 * Init app for client.
 */
var app = pome.createApp();
app.set('name', 'iobox');

// app configuration
app.configure('production|development', 'connector', function(){
  app.set('connectorConfig',
    {
      connector : pome.connectors.hybridconnector,
      heartbeat : 3,
      useDict : true,
      useProtobuf : true,
      ssl: {
        type: 'wss',
      	key: fs.readFileSync('../shared/server.key'),
  			cert: fs.readFileSync('../shared/server.crt')
      }
    });
});

app.configure('production|development', 'gate', function(){
    app.set('connectorConfig',
        {
            connector : pome.connectors.hybridconnector,
            heartbeat : 3,
            useDict : true,
            ssl: {
                type: 'wss',
                key: fs.readFileSync('../shared/server.key'),
                cert: fs.readFileSync('../shared/server.crt')
            }
        });
});

// app configure
app.configure('production|development', function() {
    // route configures
    app.route('chat', routeUtil.chat);

    // filter configures
    app.filter(pome.timeout());
});

filterUtil.loadFilters(app);

// start app
app.start();

process.on('uncaughtException', function (err) {
  console.error(' Caught exception: ' + err.stack);
});