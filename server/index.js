const express = require('express');
const helpers = require('../helpers/github');
const db = require('../database/index');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));

// middleware
app.use(express.json());
app.use(express.urlencoded());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  helpers.getReposByUsername(req.body.username, (err, data) => {
    if (err) {
      res.status(404).send('User not found!')
    } else {
      db.save(data);
      res.status(201).send('Repos are successfuly saved!');
    }

  })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

