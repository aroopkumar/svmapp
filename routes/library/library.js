var express = require('express');
var router = express.Router();
var loginservice = require('../../server/service/loginservice');
/* GET Library page. */


var Hashmap=require('hashmap');
router.get('/', function(req, res, next) {
  if(req.session.username)
      res.render('library');
  else
      res.redirect('/'+'?error');
});

router.get('/addbookcategory', function (req, res, next) {
    if(req.session.username)
    res.render('addcategory');
    else
     res.redirect('/'+'?error');
});

router.post('/addbookcategory', function (req, res, next) {
 if(req.session.username){
   var category_name = req.body.category;
   var category_id='1';
   var map=new Hashmap();
    map.set("category_name","'"+category_name+"'");
    map.set("category_id", "'"+category_id+"'");

    console.log('Map: '+map);
   //var table_name='book_category';
   //var fields = {"category_id": category_id,"category_name": category_name };

   loginservice.InsertQueryResult(map,function (err, data) {
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
        }
else{
    res.redirect('/'+'?invalid');
}
});


module.exports = router;
