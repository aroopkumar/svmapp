/**
 * @desc : 
 */

var mysql = require('mysql');
var systemsettings = require('../../config/systemsetting');

var query = "";
var columns, values;

/** Initialize db configuration */
var connection = mysql.createConnection({
    host: systemsettings.DB_SERVER,
    user: systemsettings.DB_USER_NAME,
    password: systemsettings.DB_PASSWORD,
    database: systemsettings.DB_NAME
});
/** Establising Connection */
connection.connect(function (err) {
    if (err) {
        console.error('CONNECT FAILED ', err.code);
    }
    else
        console.log('CONNECTED');
});
connection.on('error', function (err) {
    if (err.fatal)
        console.error('FATAL ERROR ', err.fatal);
});

/** Templating queries */
module.exports = {
    /** Get Query */
    GetQueryResult: function (tableName, fields, condition, sortingColumn, sortingOrder, limit, callback) {
        if (fields == "" || fields == null)
            fields = '*';
        query = 'SELECT ' + fields + ' FROM ' + tableName;
        if (condition != null && condition.length > 0)
            query = query + ' WHERE ' + condition;
        if (sortingOrder != null && sortingOrder.length > 0)
            query = query + ' ORDER BY ' + sortingColumn + ' ' + sortingOrder;
        if (limit != "" && limit != null) {
            query = query + ' LIMIT ' + limit;
        }
        console.log(query);

        connection.query(query, function (error, results, fields) {
            if (error) {
                callback(error, false);
                throw error;
            } else {
                callback(null, results);
            }
        });
    },
    /** Insert Query */
    InsertQueryResult: function (tableName, fields, callback) {
        columns = [];
        values = [];
        /** Itrating Map to and set column names and corresponding values */
        fields.forEach(function (value, key) {
            column.push(key);
            values.push(value)
        });
        /** Preaparing final queery */
        query = 'INSERT INTO ' + tableName + '(' + columns + ')' + 'values(' + values + ')';
        console.log(query);
        /** Execute the query */
        connection.query(query, function (error, results, fields) {
            if (error) {
                callback(error, false);
                throw error;
            } else {
                callback(null, results);
            }
        });
    },

    /** Update Query */
    UpdateQueryResult: function (tableName, fields, conditions, callback) {
        var columns = '';

        /** Itrating Map to get column names and corresponding values */
        fields.forEach(function (value, key) {
            columns = columns + key + " = " + "'" + value + "' ";
            columns = columns + ",";
        });

        /** Trim extra ,(comma) from string */
        columns = columns.slice(0, -1);
        /** Preparing final query*/
        query = 'update ' + tableName + ' set ' + columns + ' where ' + conditions;
        console.log(query);
        /** Execute the query */
        connection.query(query, function (error, results, fields) {
            if (error) {
                callback(error, false);
                throw error;
            } else {
                callback(null, results);
            }
        });
    },
    /** Delete Query */
    deleteQueryResult: function (tableName, condition, callback) {
        query = 'DELETE from ' + tableName + ' WHERE ' + condition;
        console.log(query);
        /** Execute the query */
        connection.query(query, function (error, results, fields) {
            if (error) {
                callback(error, false);
                throw error;
            } else {
                callback(null, results);
            }
        });
    }
}
/** Closing Connection */
// connection.end(function () {
//     console.log('Disconnected');
// });
