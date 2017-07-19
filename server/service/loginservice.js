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
    }
}