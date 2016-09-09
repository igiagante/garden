// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'),        // call express
	bodyParser = require('body-parser'),
	morgan = require('morgan'),            // log requests to the console (express4)
	expressValidator = require('express-validator'),
	multer = require('multer'),
	path = require('path');
	logger = require('./utils/logger'),
	cors = require('cors');

// connect to the database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/garden'); // connect to our database

var app = express();                 // define our app using express
// configure app to use bodyParser()
// this will let us get the data from a POST
logger.debug("Setting parse urlencoded request bodies into req.body");
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data
app.use(expressValidator());

//CORS middleware
app.use(cors());

var port = process.env.PORT || 3000;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(),             // get an instance of the express Router
	dosisRouter = require('./routers/dosis_router.js'),
	gardenRouter = require('./routers/garden_router.js'),
	irrigationRouter = require('./routers/irrigation_router.js'),
	plantRouter = require('./routers/plant_router.js'),
	imageRouter = require('./routers/image_router.js');

router.use('/doses', dosisRouter);
router.use('/gardens', gardenRouter);
router.use('/irrigations', irrigationRouter);
router.use('/plants', plantRouter);
router.use('/images', imageRouter);

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');

    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: ' Main page ' });   
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

//static
app.use(express.static(process.cwd() + '/public'));

// START THE SERVER
// =============================================================================
app.listen(port);
console.log(' Starting Server at port: ' + port);