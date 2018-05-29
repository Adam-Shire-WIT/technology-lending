# technology-lending

Application to provide real-time availability of equipment loanable from the Wentworth Institute of Technology Schumann Library Technology Sandbox.


for database connection info create a file in root called dbconfig.js that looks like this:
Make sure to add the file to .gitignore.


```module.exports = {
  user          : process.env.NODE_ORACLEDB_USER || "YOUR_DB_USER_NAME",

  // Instead of hard coding the password, consider prompting for it,
  // passing it in an environment variable via process.env, or using
  // External Authentication.
  password      : process.env.NODE_ORACLEDB_PASSWORD || "YOUR_DB_PASSWORD",

  // For information on connection strings see:
  // https://oracle.github.io/node-oracledb/doc/api.html#connectionstrings
  connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "YOUR_DB_CONNECTION STRING",

  // Setting externalAuth is optional.  It defaults to false.  See:
  // https://oracle.github.io/node-oracledb/doc/api.html#extauth
  externalAuth  : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
};```
