var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var archive = require('./archive-helpers');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {

  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt'),
  index: path.join(__dirname, '../web/public/index.html')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {

  fs.readFile(this.paths.list, 'utf8', function read(err, data) {
    if (err) {
      throw err;
    }
    var urls = data.split('\n');
    callback(urls);
  });
};

exports.isUrlInList = function(url, callback) {
  fs.readFile(this.paths.list, 'utf8', function read(err, data) {
    if (err) {
      throw err;
    }
    var string = url;
    var array = data.split('\n');
    var exists = false;


    if (array.indexOf(string) !== -1) {
      exists = true;
    }

    callback(exists);
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(this.paths.list, url, function(err) {
    if (err) {
      return console.log(err);
    }
    callback(url);
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.exists(this.paths.archivedSites + '/' + url, function(exists) {

    callback(exists);
  });
};

exports.downloadUrls = function() {};
