// all requires
var request = require('request');
var passCode = require('./secrets.js');
var fs = require('fs');
var details = process.argv.splice(2, 2);

//main function that processes API and converts JSON data
console.log('Welcome to the Github Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, callback) {
  var options = {
    url: 'https://api.github.com/repos/' + details[0] + '/' + details[1] + '/contributors',
    headers: {
      'User-Agent': 'Taylor-Cameron',
      'Authorization': 'token ' + passCode.GITHUB_TOKEN
    },
  };

  request(options, function(error, response, body) {
    var result = JSON.parse(body);
    callback(error, result);
  });
}
//function to download images and acquire the file path
function downloadImageByURL(url, filePath) {
  var destinationFile = filePath.split('/')[1];
  request.get(url)
         .on('error', function(error) {
           throw error;
         })
         .on('response', function(response) {
           console.log('Response Status code: ' + response.statusCode);
         })
         .pipe(fs.createWriteStream(`./avatars/${destinationFile}`));
}

// callback for saving images into individual files named by userName
getRepoContributors(details[0], details[1], function (error, result) {
  if(!(details[0] && details[1])) {
    console.log('Please enter: <repoOwner> <repoName>. before proceeding');
    return;
  }
  if(error) {
    throw error;
  } else {
    result.forEach(function(item) {
      var url = item.avatar_url;
      var filePath = `.avatars/${item.login}`;
      downloadImageByURL(url, filePath);
    });
  }
});

