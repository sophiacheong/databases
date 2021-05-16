DROP DATABASE IF EXISTS chat;
CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name VARCHAR(250) NOT NULL
);

CREATE TABLE rooms (
  id INTEGER PRIMARY KEY,
  name VARCHAR(250) NOT NULL
);

CREATE TABLE messages (
  id INTEGER PRIMARY KEY,
  messageText VARCHAR(500),
  userID INTEGER,
  roomID INTEGER,
  FOREIGN KEY(userID) REFERENCES users(id),
  FOREIGN KEY(roomID) REFERENCES rooms(id)
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

