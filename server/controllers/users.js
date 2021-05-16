var models = require('../models');
var connection = require('../db/index.js');

module.exports = {
  get: function (req, res) {
    var qryString = 'SELECT * FROM users';
    connection.query(qryString, (err, results) => {
      if (err) { res.status(400).send(err); } else { res.status(200).send(results); }
    });
  },
  post: function (req, res) {
    var qryString = `INSERT INTO users(name) VALUES ('${req.body.username}')`;
    connection.query(qryString, (err, results) => {
      if (err) { res.status(400).send(err); } else { res.status(200).send(results); }
    });
  }
};
