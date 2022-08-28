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
  // createdAt: { type: Date, default: Date.now },
  // updatedAt: { type: Date, default: Date.now },
  forks_count: Number,
  username: String
});
// Make sure repos are unique

let Repo = mongoose.model('Repo', repoSchema);

module.exports.Repo = Repo;

let save = (repos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  async function saveRepos() {
    try {
      if (Array.isArray(repos)) {
        for (var repo of repos) {
          var newRepo = await Repo.create({
            repo_id: repo.id,
            name: repo.name,
            description: repo.description,
            link: repo.html_url,
            forks_count: repo.forks_count,
            username: repo.owner.login
          });
        }
      } else if (typeof repos === 'object') {
        var newRepo = await Repo.create({
          repo_id: repos.id,
          name: repos.name,
          description: repos.description,
          link: repos.html_url,
          forks_count: repos.forks_count,
          username: repos.owner.login
        });
      }
    } catch (err) {
      console.log('Error: ', err);
    }
  }
  saveRepos();
}

module.exports.save = save;