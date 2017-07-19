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
    if (data.length>0) {

      var hour = 30 * 60 * 1000;//session time out 30 minutes
      req.sessionOptions.maxAge = hour; //Set cookie max age
      req.sessionOptions.expires=new Date(Date.now()+hour);//Set expiration date
      req.session.username = username;//Set username in session variable
<<<<<<< HEAD

      var path=['','admin','student','teacher','library','transport'];

      res.redirect('/'+path[data[0].user_role]+'/');
=======
      res.redirect('/admin/')
>>>>>>> a84f10291bc332e5b0ebfbecb25740219e2e863b
    } else {
      res.redirect('/' + '?error');
    }
  });
})
  .get('/login', function (req, res) {
    res.redirect('/');
  });

router.get('/logout', function (req, res, next) {
  req.session = null;
  res.redirect('/');
});
module.exports = router;
