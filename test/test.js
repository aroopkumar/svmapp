var express=require('express');
var app=express();


app.listen(3000,function(){
    console.log('Server started at 3000');
});


var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.route('/home')
    .get(function(req,res){
        console.log('in get');
        res.send('Hello');
    })
    .post(function(req,res){
        console.log('in post')
    })