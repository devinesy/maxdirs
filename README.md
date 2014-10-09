
# maxdirs

A utility to trim the subdirectories in a directory based on a maximum, deletes oldest first.

## Installation

As a command line tool

$ [sudo] npm install -g maxdirs

As a libary
$ npm install maxdirs

## Command line

$ maxdirs <directory> <maxNumberOfSubdirectories>

If the number of sub-directories within directory exceeds maxNumberOfSubdirectories, the necessary count will be recursively deleted.

## As a library

$ var maxdirs = require('maxdirs');

$ maxdirs.purge(directory, maxNumberOfSubdirectories, callback);

callback takes (err, numberDeleted).

See test/purge.js for an example.
