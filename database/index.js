const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repo_id: {
    type: Number,
    unique: true
  },
  name: String,
  description: String,
  link: {
    type: String,
    unique: true
  },
  forks_count: Number,
  watchers: Number,
  username: String
});
// Make sure repos are unique

let Repo = mongoose.model('Repo', repoSchema);

module.exports.Repo = Repo;

let save = (repos) => {
  // TODO: Your code here
  // This function should save a repo or repos to the MongoDB
  // Or update the existed repo with new information
  async function saveRepo() {
    for (var repo of repos) {
      var filter = {
        repo_id: repo.id
      }
      var newRepo = {
        name: repo.name,
        description: repo.description,
        link: repo.html_url,
        forks_count: repo.forks_count,
        watchers: repo.watchers,
        username: repo.owner.login
      }
      var options = {
        new: true,
        upsert: true
      }
      await Repo.findOneAndUpdate(filter, newRepo, options);
    }
  }
  return saveRepo();
}

module.exports.save = save;


// let save = (repos) => {
//   // TODO: Your code here
//   // This function should save a repo or repos to
//   // the MongoDB
//   for (var repo of repos) {
//     var newRepo = {
//       repo_id: repo.id,
//       name: repo.name,
//       description: repo.description,
//       link: repo.html_url,
//       forks_count: repo.forks_count,
//       watchers: repo.watchers,
//       username: repo.owner.login
//     }
//     Repo.create(newRepo);
//   }
// }