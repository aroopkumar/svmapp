var express = require('express');
var router = express.Router();
var loginservice = require('../../server/service/loginservice');
/* GET Library page. */
router.get('/', function(req, res, next) {
  if(req.session.username)
      res.render('library');
  else
      res.redirect('/'+'?error');
});

router.get('/addbookcategory', function (req, res, next) {
   //res.redirect('/library');
   res.render('addcategory');
});

router.post('/addcategory', function (req, res, next) {
   var category_name = req.body.category;
   var category_id='1';

   var table_name='book_category';
   var fields = {"category_id": category_id, 
                    "category_name": category_name };

   loginservice.InsertQueryResult(table_name,fields,function (err, data) {
            if (data) {
                //callback(null, true);
                //res.redirect('/admin/')
                console.log('category added');
            } else {
                //callback(err, false);
                //res.redirect('/admin/')
                console.log('category not added');
            }
        });
});
module.exports = router;
