let sqlite3 = require('sqlite3');

// will sit in root of project directory
let database = new sqlite3.Database('./database.db');

// Create variable for the SQL statement
const createUsers = 
`CREATE TABLE IF NOT EXISTS tblUsers (
  name TEXT,
  email TEXT,
  password TEXT)`;

const createEvents = 
`CREATE TABLE IF NOT EXISTS tblEvents (
  eventName TEXT,
  eventDescription TEXT,
  location TEXT,
  time TEXT)`;

const createUserEvents = 
`CREATE TABLE IF NOT EXISTS tblUserEvents (
  user_id INTEGER,
  event_id INTEGER)`;

  // Create database.run

  database.exec(createUsers, error => {
    if (error) {console.log("Create users table failed", error)}
    else {console.log("Create users table succeeded")}
  });

  database.exec(createEvents, error => {
    if (error) {console.log("Create events table failed", error)}
    else {console.log("Create events table succeeded")}
  });

  database.exec(createUserEvents, error => {
    if (error) {console.log("Create UserEvents failed", error)}
    else {console.log("Create UserEvents succeeded")}
  });

  // Export database
  module.exports = database;