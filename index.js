#!/usr/bin/env node
"use strict"

const shell = require('shelljs');
const filesize = require('filesize');
const pjson = require('./package.json');
const fs = require('fs');
const { promisify } = require('util');
const promisifiedStat = promisify(fs.stat);
const promisifiedExec = promisify(shell.exec);
const args = process.argv.slice(2);

// --------------- Validation ---------------
if (args.length === 0) {
  shell.echo('No arguments found');
  process.exit(9);
}

// -------------- Help Section --------------
if (isHelpCmd(args[0])) {
  help();
}

// ------------- Version Section -------------
if (isVersionCmd(args[0])) {
  getVersion();
}

// -------------- Grep Section --------------
const [grepArgs, grepOrdArg] = splitArgs(args);
const usersCommand = `grep  ${grepArgs.join(' ').trimStart()}`;
const [sortBy, sortOrd, limit] = getSortArgs(grepOrdArg);
const sortedResultsArray = sortResults(usersCommand, sortBy, sortOrd);
const limitedResultsArray = limitResults(sortedResultsArray, limit);
echoResults(limitedResultsArray);

// ------------ Functions Section ------------
function isHelpCmd(firstArg) {
  return ['-h', '--help'].includes(firstArg);
}

function help() {
  const readmePath = `${__dirname}/README.md`;
  fs.readFile(readmePath, 'utf8', (err, data) => {
    if (err) throw err;
    shell.echo(data);
    process.exit(0);
  });
}

function isVersionCmd(firstArg) {
  return ['-v', '--version'].includes(firstArg);
}

function getVersion() {
  shell.echo(pjson.version);
  process.exit(0);
}

function splitArgs(args) {
  let splitArgsArray = [args, ''];
  let lastArg = args.slice(-1)[0].trimStart();
  if (lastArg.startsWith('-sort:')) {
    lastArg = lastArg.replace('-sort:', '');
    args.pop();
    splitArgsArray = [args, lastArg];
  }
  return splitArgsArray;
}

function getSortArgs(grepOrdArg) {
  const sortArgs = [];
  const [sortBy, sortOrd, limit] = grepOrdArg.split(',');

  if (sortBy && (sortBy.length > 0)) {
    sortArgs.push(sortBy);
  } else {
    sortArgs.push('mtime');
  }

  if (sortOrd && (sortOrd.length > 0)) {
    sortArgs.push(sortOrd);
  } else {
    sortArgs.push('desc');
  }

  if (limit && (limit.length > 0)) {
    sortArgs.push(parseInt(limit));
  } else {
    sortArgs.push(0);
  }

  return sortArgs;
}

async function getResults(usersCommand) {
  let resultsArray = [];
  try {
    const results = await promisifiedExec(usersCommand, { silent:true });
    resultsArray = results.split('\n').filter(p => p);
  } catch(err) {
    shell.echo(err);
  }
  return resultsArray;
}

function sortByTypeCheck(statResult, sortBy) {
  if (!statResult.hasOwnProperty(sortBy)) {
    shell.echo(`Can not sort by: ${sortBy}`);
    process.exit(9);
  }
}

function getSortValue(sortByResult, sortBy) {
  let sortValue = sortByResult;
  if (['atime', 'mtime', 'ctime', 'birthtime'].includes(sortBy)) {
    sortValue = sortByResult.getTime();
  }
  return sortValue;
}

function getSortDisplay(sortByResult, sortBy) {
  let sortDisplay = sortByResult;
  switch (sortBy) {
    case 'atime':
    case 'mtime':
    case 'ctime':
    case 'birthtime':
      sortDisplay = sortByResult.toLocaleString().replace(/ /g, '_');
      break;
    case 'size':
    case 'blksize':
      sortDisplay = filesize(sortByResult).replace(/ /g, '_');
      break;
  }
  return sortDisplay;
}

function getSortingNumber(x) {
  return parseFloat(x.split(' ').shift());
}

async function sortResults(usersCommand, sortBy = 'mtime', sortOrd = 'desc') {
  let sortedArray = '';
  try {
    const resultsArray = await getResults(usersCommand);
    const sortAndResultsArray = await Promise.all(resultsArray.map(async (resultPath, index) => {
      const statResult = await promisifiedStat(resultPath);
      if (index === 0) {
        sortByTypeCheck(statResult, sortBy);
      }
      const sortByResult = statResult[sortBy];
      const sortValue = getSortValue(sortByResult, sortBy);
      const sortDisplay = getSortDisplay(sortByResult, sortBy);
      return `${sortValue} ${sortDisplay} ${resultPath}`;
    }));

    if (sortOrd === 'desc') {
      sortAndResultsArray.sort((a, b) => getSortingNumber(b) - getSortingNumber(a));
    } else {
      sortAndResultsArray.sort((a, b) => getSortingNumber(a) - getSortingNumber(b));
    }

    sortedArray = sortAndResultsArray.map((sortAndPath) => {
      const sortAndPathSplit = sortAndPath.split(' ');
      sortAndPathSplit.shift();
      const sortDisplay = sortAndPathSplit.shift().replace(/_/g, ' ');
      return `${sortAndPathSplit.join(' ')} ${sortDisplay}`;
    });

  } catch(err) {
    shell.echo(err);
  }
  return sortedArray;
}

async function limitResults(resultsArrayPromise, limit) {
  let resultsArray = [];
  try {
    resultsArray = await resultsArrayPromise;
    if (limit > 0) {
      resultsArray =  resultsArray.slice(0, limit);
    }
  } catch(err) {
    shell.echo(err);
  }
  return resultsArray;
}

async function echoResults(resultsArrayPromise) {
  try {
    const resultsArray = await resultsArrayPromise;
    if (resultsArray && (resultsArray.length > 0)) {
      shell.echo(resultsArray.join('\n'));
    } else {
      shell.echo('No results');
    }
  } catch(err) {
    shell.echo(err);
  }
}

