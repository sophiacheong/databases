var models = require('../models');

module.exports = {
  get: function (req, res) {
    models.users.getAll(req, res, (err, results) => {
      if (err) { res.status(400).send(err); } else { res.status(200).send(results); }
    });
  },
  post: function (req, res) {
    models.users.create(req, res, (err, results) => {
      if (err) { res.status(400).send(err); } else { res.status(200).send('Success'); }
    });
  }
};
