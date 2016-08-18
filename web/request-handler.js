var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var qs = require('querystring');
// require more modules/folders here!

exports.handleRequest = function(req, res) {
  var filePath;
  var status = 200;

  if (req.method === 'GET') {

    fs.exists(archive.paths.archivedSites + '/' + req.url, function(exists) {

      // if it doesn't exist
      if (!exists) {
        status = 404;
        res.writeHead(status, { 'Content-Type': 'text/html' });
        res.end();

        // if it does exist
      } else {
        // set the filepath ('/' or specific site)
        if (req.url === '/') {
          filePath = archive.paths.index;
        } else {
          filePath = archive.paths.archivedSites + '/' + req.url;
        }

        // write and send back the requested data
        fs.readFile(filePath, 'utf8', function read(err, data) {
          if (err) {
            throw err;
          }
          res.end(data);
        });
      }
    });

    // if POST}
  } else if (req.method === 'POST') {

    // get the data, slice and parse it
    req.on('data', function(data) {
      post = ('' + data).slice(4) + '\n';

      // write it to sites.txt
      fs.appendFile(archive.paths.list, post, function(err) {
        if (err) {
          return console.log(err);
        }

        // send response 302
        status = 302;
        res.writeHead(status, { 'Content-Type': 'text/html' });
        res.end();

      });
    });
  }
};




// console.log('content:', content);
