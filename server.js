const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const debug = require('debug')('UAT:Server');
const upload = require('./lib/upload');
const execAudit = require('./lib/audit-cli');

// Initiate express
const app = express();

// Log all requests
// TODO: config morgan with options
app.use(morgan('dev'));

// Enable CORS
// const whitelist = ['http://0.0.0.0:9091', 'http://0.0.0.0:3000'];
// const corsOptions = {
// 	origin: (origin, callback) => {
// 		const originIsWhitelisted = whitelist.indexOf(origin) !== -1;
// 		debug('checking origin >', origin, '<', originIsWhitelisted);
// 		callback(null, originIsWhitelisted);
// 	},
// 	allowedHeaders: 'accept, content-type, Authorization, Range',
// 	credentials: true
// };

// app.use(cors(corsOptions));

// API
const apiRoot = '/';
const port = process.env.PORT || 3000;
const protocol = 'http';
const host = 'localhost';
const auditor = process.env.AUDITOR || 'asqatasun';

// parse data for post and get requests
app.use(apiRoot, bodyParser.urlencoded({
	extended: true,
	limit: '10mb'
}));
app.use(apiRoot, bodyParser.json({limit: '10mb'}));

// Routes

// Create file
app.post(`${apiRoot}audit`, (req, res) => {
	debug('creating file');
	upload
		.uploadFile(req, res)
		.then(execAudit.bind(null, auditor))
		.then(result => {
			debug('sending result:');
			debug('---------------');
			debug(result);
			debug('---------------');
			res.send(result);
		})
		.catch(err => {
			debug(err);
			res.status(500).send(err);
		});
});

// Check if call from command line or ==>
if (require.main === module) {
	// Listen to port
	const httpServer = app.listen(port, () => {
		debug(`Listening to port ${httpServer.address().port}`);
	});
// ==> Required by the tests for example
} else {
	module.exports = app;
}
