[![Build Status](https://api.travis-ci.com/petekeller2/grepord.svg?branch=master)](https://travis-ci.com/petekeller2/grepord) 
[![dependencies Status](https://status.david-dm.org/gh/petekeller2/grepord.svg)](https://david-dm.org/petekeller2/grepord)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/petekeller2/grepord/LICENSE)
[![npm version](http://img.shields.io/npm/v/grepord.svg?style=flat)](https://npmjs.org/package/grepord)
[![Automated Release Notes by gren](https://img.shields.io/badge/%F0%9F%A4%96-release%20notes-00B2EE.svg)](https://github-tools.github.io/github-release-notes/)

# About

Use this program to [grep](https://en.wikipedia.org/wiki/Grep) (search) for an ordered list of files. Example:
Within a given directory, find the most recently updated files that
contain the text 'hello world'.

# Installation

`npm install -g grepord`

# Usage

`grepord <grep arguments>… [-sort:[<fs.Stats property>][,][(desc|asc)][,][<limit number>]]`

Grepord requires grep to already be installed. Type `grep -h` to check if grep is installed.

To use this program, you must enter grep arguments that will return file paths. Example: `grepord -iRl './' -e 'hello world'`

You can sort by the properties of fs.Stats. See: https://nodejs.org/api/fs.html#fs_class_fs_stats

The default sort is mtime descending. The format for changing
the sort is -sort: as the last argument, with an optional
fs.Stats property, a comma, an optional desc or asc, a comma and
then an optional limit number (This operates the same way as the
SQL LIMIT/TOP clause). Example: `grepord -iRl './' -e 'hello world' -sort:size,asc,10`

# Release Steps

- `npm run test`
- Update package.json version
- `npm run build-man`
- Push updates
- `npm run release`

# Source Code

- index.js
- test.mjs