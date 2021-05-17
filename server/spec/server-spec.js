/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql2');
var axios = require('axios');
var expect = require('chai').expect;

describe('Persistent Node Chat Server', function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'chat'
    });
    dbConnection.connect();

    var tablename = 'messages'; // TODO: fill this out

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    dbConnection.query('truncate ' + tablename, done);
  });

  afterEach(function() {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', function(done) {
    // Post the user to the chat server.
    axios.post('http://127.0.0.1:3000/classes/users', {
      username: 'Valjean'
    })
    // Post a message to the node chat server:
      .then(
        function () {

          axios.post('http://127.0.0.1:3000/classes/messages', {
            userID: '1',
            message: "In mercy\'s name, three days is all I need.",
            roomID: '1'
          })
            .then(
              function () {
                // Now if we look in the database, we should find the
                // posted message there.

                // TODO: You might have to change this test to get all the data from
                // your message table, since this is schema-dependent.
                var queryString = 'SELECT * FROM messages';
                var queryArgs = [];

                dbConnection.query(queryString, queryArgs, function(err, results) {
                  if (err) {
                    throw err;
                  } else {
                    // Should have one result:
                    expect(results.length).to.equal(1);

                    // TODO: If you don't have a column named text, change this test.
                    expect(results[0].messageText).to.equal('In mercy\'s name, three days is all I need.');

                    done();
                  }
                });
              }
            );
        }
      );
  });

  it('Should output all messages from the DB', function(done) {
    // Let's insert a message into the db
    var queryString = 'INSERT INTO messages(messageText, userID, roomID) VALUES ("Men like you can never change!", 1, 1)';
    var queryArgs = [];
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */

    dbConnection.query(queryString, queryArgs, function(err) {
      if (err) { throw err; }

      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      axios.get('http://127.0.0.1:3000/classes/messages')
        .then(function (response) {
          var messageLog = response.data;
          expect(messageLog[0].messageText).to.equal('Men like you can never change!');
          expect(messageLog[0].roomID).to.equal(1);
          done();
        });
    });
  });

  it('Should insert username into database', function(done) {
    axios.post('http://127.0.0.1:3000/classes/users', {
      username: 'Valjean'
    })
      .then(function() {
        axios.get('http://127.0.0.1:3000/classes/users')
          .then(function(response) {
            var username = response.data;
            expect(username[username.length - 1].name).to.equal('Valjean');
            done();
          });
      });
  });
});
