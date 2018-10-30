var request = require('request');
var passCode = require('./secrets.js');

console.log('Welcome to the Github Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, callback) {
  var options = {
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'request',
      'Authorization': passCode.GITHUB_TOKEN
    },
  };

  request(options, function(error, response, body) {
    var result = JSON.parse(body);
    callback(error, result);
  });
}

getRepoContributors("jquery", "jquery", function (error, result) {
  if(error) {
    throw error;
  }
  for(var i = 0; i < result.length; i++) {
    console.log(result[i].avatar_url);
  }
});

