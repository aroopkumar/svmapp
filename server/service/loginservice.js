var dbtemplate = require('../database/dbtemplate');
var columns = [];
var values = [];
var conditions = "";
var message;

module.exports = {
    AuthenticateUser: function (username, password, callback) {
        conditions = 'username = ' + "'" + username + "'" + ' AND ' + 'password = ' + "'" + password + "'";
        dbtemplate.GetQueryResult('admin', '', conditions, null, null, null, function (err, data) {
            if (data.length > 0) {
                callback(null, data);
            } else {
                callback(err, false);
            }
            
        });
    },
    InsertQueryResult: function(fields, callback){
        dbtemplate.InsertQueryResult('book_category',fields,function (err, data){
            if (data.affectedRows> 0) {
                callback(null, true);
                //console.log('category added');
            } else {
                callback(err, false);
                //console.log('category not added');
            }
        });          
    }

}