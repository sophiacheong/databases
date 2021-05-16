var models = require('../models');
var connection = require('../db/index.js');

module.exports = {
  get: function (req, res) {
    var qryString = 'SELECT * FROM messages';
    connection.query(qryString, (err, results) => {
      if (err) { res.stauts(404).send(err); } else { res.status(200).send(results); }
    });
  },
  post: function (req, res) {
    var qryString = `INSERT INTO messages(messageText, userID, roomID) VALUES ("${req.body.message}", ${req.body.userID}, ${req.body.roomID})`;
    connection.query(qryString, (err, results) => {
      if (err) { res.status(400).send(console.log(err)); } else { res.status(200).send('Success'); }
    });
  }
};
