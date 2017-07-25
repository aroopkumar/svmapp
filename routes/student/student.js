var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.redirect('/login');
});

router.get('/home', function (req, res, next) {
    if (req.session.username)
        res.render('index',{title:'Home'});
    else {
        res.redirect('/' + '?timeout');
    }
});

module.exports = router;
