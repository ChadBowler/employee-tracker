const express = require('express');
const mysql = require('mysql2');
require('dotenv').config()
const inquirer = require('inquirer');
const logo = require('./assets/logo');
const menu = require('./menu')

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: process.env.DB_PASS,
    database: 'manager_db'
  },
  console.log(`Connected to the manager_db database.`)
);

function init() {
    logo();
    menu();
}
init();


// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

