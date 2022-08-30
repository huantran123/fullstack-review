const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (username) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: 'https://api.github.com/users/' + username + '/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${process.env.TOKEN || config.TOKEN}`
    }
  };

  return axios({
    method: 'get',
    url: options.url,
    headers: options.headers
  })
  .then((res) => {
    // cb(null, res.data)
    console.log(res.data)
    return res.data;
  })
  .catch((err) => {
    // cb(err, null);
    return err;
  })


}

module.exports.getReposByUsername = getReposByUsername;