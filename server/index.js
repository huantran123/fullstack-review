const express = require('express');
const helpers = require('../helpers/github');
const db = require('../database/index');
let app = express();
const cool = require('cool-ascii-faces')          // Adding for heroku

app.use(express.static(__dirname + '/../client/dist'));
app.get('/cool', (req, res) => res.send(cool()));          // Adding for heroku

// middleware
app.use(express.json());
app.use(express.urlencoded());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  // helpers.getReposByUsername(req.body.username, (err, data) => {
  //   if (err) {
  //     res.status(404).send('User not found!')
  //   } else {
  //     db.save(data);
  //     res.status(201).send('Repos are successfuly saved!');
  //   }

  // })

  helpers.getReposByUsername(req.body.username)
    .then((data) => {
      return db.save(data);
    })
    .then(() => {
      res.status(201).send('Repos are successfuly saved!');
    })
    .catch(() => {
      res.status(404).send('User not found!')
    })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.Repo.find()
    .sort({forks_count: -1, name: 1})
    .limit(25)
    .exec((err, repos) => {
      if (err) {
        res.status(400).send('Cannot query repos');
      }
      res.status(200).send(repos);
    })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

