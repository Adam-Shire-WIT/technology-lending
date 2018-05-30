var oracledb = require('oracledb');
var dbConfig = require('./dbconfig.js');
var express = require('express');
var app = express();


app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))


var PORT = process.env.PORT || 8089;

app.listen(PORT, function () {
console.log(`Server running, Express is listening on port ${PORT}...`);
});





app.post('/available', function (req, res) {

  var itemIDs = req.body.itemIDs;


  var selectStatement = `SELECT ITEM_ID AS ITEMID, COUNT(CIRC_TRANSACTION_ID) AS STATUS
                        FROM CIRC_TRANSACTIONS
                        WHERE CIRC_TRANSACTIONS.ITEM_ID IN (${itemIDs})
                        GROUP BY ITEM_ID`;

//setup database connection
  oracledb.getConnection(
  {
    user          : dbConfig.user,
    password      : dbConfig.password,
    connectString : dbConfig.connectString
  },
  function(err, connection) {
    if (err) {
      console.log('Error in acquiring connection ...');
      console.log('Error message '+err.message);
      res.status(500).send(err.message)
      doRelease(connection);
      return;
    }
     console.log('connection successful')
     //console.log(`executing ${selectStatement}`)
    connection.execute(selectStatement,
       {},
       {outFormat: oracledb.OBJECT},  // Return the result as Object
       function (err, result) {
        if (err) {
          console.log('Error in execution of select statement'+err.message);
          res.status(500).send(err.message)
        } else {


        res.json(result.rows);
      }
      doRelease(connection);
    });


  });


});


app.get('/available/:id', function (req, res) {

  var itemID = req.params.id;

  var selectStatement = `SELECT COUNT(CIRC_TRANSACTION_ID) AS status
                        FROM CIRC_TRANSACTIONS
                        WHERE CIRC_TRANSACTIONS.ITEM_ID =` + itemID;

//setup database connection
  oracledb.getConnection(
  {
    user          : dbConfig.user,
    password      : dbConfig.password,
    connectString : dbConfig.connectString
  },
  function(err, connection) {
    if (err) {
      console.log('Error in acquiring connection ...');
      console.log('Error message '+err.message);
      res.status(500).send(err.message)
      doRelease(connection);
      return;
    }
     console.log('connection successful')
     //console.log(`executing ${selectStatement}`)
    connection.execute(selectStatement,
       {},
       {outFormat: oracledb.OBJECT},  // Return the result as Object
       function (err, result) {
        if (err) {
          console.log('Error in execution of select statement'+err.message);
          res.status(500).send(err.message)
        } else {
        //console.log('db response is ready '+result.rows);

        res.json(result.rows);
      }
      doRelease(connection);
    });


  });


});



function doRelease(connection) {
  connection.release(
  function(err) {
    if (err) {
    console.error(err.message);
    }
  });
}
