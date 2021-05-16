var db = require('../db');

module.exports = {
  getAll: function (req, res, callback) {
    var qryString = 'SELECT * FROM users';
    db.query(qryString, (err, results) => {
      if (err) { callback(err); } else { callback(null, results); }
    });
  },
  create: function (req, res, callback) {
    var qryString = `INSERT INTO users(name) VALUES ('${req.body.username}')`;
    db.query(qryString, (err, results) => {
      if (err) { callback(err); } else { callback(null, results); }
    });
  }
};
