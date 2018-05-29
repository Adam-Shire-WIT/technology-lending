var oracledb = require('oracledb');
var dbConfig = require('./dbconfig.js');
oracledb.outFormat = oracledb.OBJECT ;                // (4002) Fetch each row as an object
const sql = `SELECT MFHD_MASTER.MFHD_ID AS MFHD_ID, LOCATION.LOCATION_CODE AS location
 FROM LOCATION, MFHD_MASTER
 WHERE LOCATION.LOCATION_CODE = :location
 AND MFHD_MASTER.LOCATION_ID = LOCATION.LOCATION_ID`





oracledb.getConnection(
  {
    user          : dbConfig.user,
    password      : dbConfig.password,
    connectString : dbConfig.connectString
  },
  function(err, connection) {
    if (err) {
      console.error(err.message);
      return;
    }
    connection.execute(
      sql, //the query string
      {location: 'WITTECH'}, //the bind values for variables in query string

      // The callback function handles the SQL execution results
      function(err, result) {
        if (err) {
          console.error(err.message);
          doRelease(connection);
          return;
        }

        // console.log(result.metaData); // [ { name: 'DEPARTMENT_ID' }, { name: 'DEPARTMENT_NAME' } ]
        SaveResultsToFile(result.rows);     // [ [ 180, 'Construction' ] ]
        doRelease(connection);

      });
});





// Note: connections should always be released when not needed
function doRelease(connection) {
  connection.close(
    function(err) {
      if (err) {
        console.error(err.message);
      }
    });
};

function SaveResultsToFile(results) {

  console.log(results);
}
