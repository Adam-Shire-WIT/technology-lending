// var http = require('http');
var oracledb = require('oracledb');
var dbConfig = require('./dbconfig.js');
var express = require('express');
var app = express();


var selectStatement = `SELECT MFHD_MASTER.MFHD_ID AS MFHD_ID, LOCATION.LOCATION_CODE AS location
 FROM LOCATION, MFHD_MASTER
 WHERE LOCATION.LOCATION_CODE = :location
 AND MFHD_MASTER.LOCATION_ID = LOCATION.LOCATION_ID`;

var PORT = process.env.PORT || 8089;

app.listen(PORT, function () {
console.log('Server running, Express is listening...');
});

app.get('/', function (req, res) {
//res.writeHead(200, {'Content-Type': 'text/html'});
//res.write("No Data Requested, so none is returned");
//res.end();
res.status(200).send('no query. try /locations/[locationCode] ')
});

app.get('/locations', handleAllDepartments);

app.get('/locations/:locationCode', handleAllDepartments);
//{
// var locationCode = req.params.locationCode;

//handleDatabaseOperation( req, res, function (request, response, connection) {
//connection.execute( selectStatement
//, {location: locationCode}, {
//outFormat: oracledb.OBJECT // Return the result as Object
//}, function (err, result) {
//if (err) {
//console.log('Error in execution of select statement'+err.message);
//response.writeHead(500, {'Content-Type': 'application/json'});
//response.end(JSON.stringify({
//status: 500,
//message: "Error getting the employees for the department "+departmentIdentifier,
//detailed_message: err.message
//})
//);
//} else {
//console.log('db response is ready '+result.rows);
//response.writeHead(200, {'Content-Type': 'application/json'});
//res.status(200).type('json');
//response.end(JSON.stringify(result.rows));
//res.json(result.rows)
//}
//doRelease(connection);
//}
//);
//});
//} );

function handleDatabaseOperation( request, response, callback) {

oracledb.getConnection(
{
  user          : dbConfig.user,
  password      : dbConfig.password,
  connectString : dbConfig.connectString
},
function(err, connection)
{
if (err) {
console.log('Error in acquiring connection ...');
console.log('Error message '+err.message);


res.status(500).send(err.message)

return;
}
// do with the connection whatever was supposed to be done
console.log('Connection acquired ; go execute ');
console.log(`request ${request.query.name}`)
callback(request, response, connection);
});
}//handleDatabaseOperation

function handleAllDepartments(req, res) {
  handleDatabaseOperation(req, res, getResults) ;
  } //handleAllDepartments

function doRelease(connection) {
  connection.release(
  function(err) {
    if (err) {
    console.error(err.message);
    }
  });
}

function getResults(req, res, connection)
{

 var locationCode = req.params.locationCode || req.query.name || '%'
  connection.execute( selectStatement, {location: locationCode}, {
      outFormat: oracledb.OBJECT // Return the result as Object
    }, function (err, result) {
      if (err) {
        console.log('Error in execution of select statement'+err.message);
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({
          status: 500,
          message: "Error getting the departments",
          detailed_message: err.message
        })
      );
    } else {
      console.log('db response is ready '+result.rows);
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(result.rows));
    }
    doRelease(connection);
  }
);

}
