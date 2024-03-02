const { Client } = require('pg');
const fs = require('fs');

// PostgreSQL connection configuration
const dbConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'customer_data',
  password: 'Inthu@4647',
  port: 5432, // Change this according to your PostgreSQL port
};

// Create a PostgreSQL client
const client = new Client(dbConfig);

// Connect to the PostgreSQL database
client.connect();

// Specify the table and query
const tableName = 'customers_data';
const query = `SELECT * FROM ${tableName}`;

// Fetch data from the table
client.query(query, (err, result) => {
  if (err) {
    console.error('Error executing query', err);
    client.end();
    return;
  }

  // Convert the result to JSON
  const jsonData = JSON.stringify(result.rows, null, 2);

  // Write JSON data to a file
  const fileName = `${tableName}_data.json`;
  fs.writeFile(fileName, jsonData, (writeErr) => {
    if (writeErr) {
      console.error('Error writing to file', writeErr);
    } else {
      console.log(`Data exported to ${fileName}`);
    }

    // Disconnect from the PostgreSQL database
    client.end();
  });
});
