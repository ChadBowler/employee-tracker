const express = require('express');
// const mysql = require('mysql2/promise');
require('dotenv').config()
// const inquirer = require('inquirer');
const logo = require('./assets/logo');
const menu = require('./menu');
// const { config } = require('dotenv');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

function init() {
    logo();
    menu();
}

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
});

init();
