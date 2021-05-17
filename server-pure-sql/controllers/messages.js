var models = require('../models');

module.exports = {
  get: function (req, res) {
    models.messages.getAll(req, res, (err, results) => {
      if (err) { res.stauts(404).send(err); } else { res.status(200).send(results); }
    });
  },
  post: function (req, res) {
    models.messages.create(req, res, (err, results) => {
      if (err) { res.status(400).send(console.log(err)); } else { res.status(200).send('Success'); }
    });
  }
};
