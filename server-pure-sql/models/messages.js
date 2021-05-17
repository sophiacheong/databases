var db = require('../db');

module.exports = {
  getAll: function (req, res, callback) {
    var qryString = 'SELECT * FROM messages';
    db.query(qryString, (err, results) => {
      if (err) { callback(err); } else { callback(null, results); }
    });
  },
  create: function (req, res, callback) {
    var qryString = `INSERT INTO messages(messageText, userID, roomID) VALUES ("${req.body.message}", ${req.body.userID}, ${req.body.roomID})`;
    db.query(qryString, (err, results) => {
      if (err) { callback(err); } else { callback(null, results); }
    });
  }
};
