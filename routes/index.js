var express = require('express');
var router = express.Router();
var loginservice = require('../server/service/loginservice');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login', { title: 'SMS | Login' });
});

router.post('/login', function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  loginservice.AuthenticateUser(username, password, function (err, data) {
    if (data) {
      var hour = 30 * 60 * 1000;//session time out 30 minutes
      req.sessionOptions.maxAge = hour; //Set cookie max age
      req.sessionOptions.expires=new Date(Date.now()+hour);//Set expiration date
      req.session.username = username;//Set username in session variable
      res.redirect('/admin/')
    } else {
      res.redirect('/' + '?error');
    }
  });
})
  .get('/login', function (req, res) {
    res.redirect('/');
  })
module.exports = router;

router.get('/logout', function (req, res, next) {
  req.session = null;
  res.redirect('/');
});

// router.get('/library', function (req, res, next) {
//    //res.redirect('/library');
//    res.render('library');
// });

// router.get('/addbookcategory', function (req, res, next) {
//    //res.redirect('/library');
//    res.render('addcategory');
// });

