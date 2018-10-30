var request = require('request');
var passCode = require('./secrets.js');

console.log('Welcome to the Github Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, callback) {
  var options = {
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'request';
    }
  };

  request(url, function(err, res, body) {
    callback(err, body);
  });
}

getRepoContributors("jquery", "jquery", function (err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});

