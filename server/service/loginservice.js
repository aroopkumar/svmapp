var dbtemplate = require('../database/dbtemplate');
var columns = [];
var values = [];
var conditions = "";
var message;

module.exports = {
    AuthenticateUser: function (username, password, callback) {
        conditions = 'username = ' + "'" + username + "'" + ' AND ' + 'password = ' + "'" + password + "'";
        dbtemplate.GetQueryResult('user', '', conditions, null, null, null, function (err, data) {
            if (data.length > 0) {
                callback(null, true);
            } else {
                callback(err, false);
            }
            
        });
    }
    ,
    InsertQueryResult: function(table_name, fields, callback){
        dbtemplate.InsertQueryResult(table_name,fields,function (err, data){
            if (data.length > 0) {
                callback(null, true);
                //console.log('category added');
            } else {
                callback(err, false);
                //console.log('category not added');
            }
        });          
    }

}