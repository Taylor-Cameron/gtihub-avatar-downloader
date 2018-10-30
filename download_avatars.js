var request = require('request');
var passCode = require('./secrets.js');
var fs = require('fs');

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

function downloadImageByURL(url, filePath) {
  request.get(url)
         .on('error', function(error) {
           throw error;
         })
         .on('response', function(response) {
           console.log('Response Status code: ' response.statusCode)
         })
         .pipe(fs.createWriteStream(filePath));
}

getRepoContributors("jquery", "jquery", function (error, result) {
  if(error) {
    throw error;
  }
  for(var i = 0; i < result.length; i++) {
    console.log(result[i].avatar_url);
  }
});

