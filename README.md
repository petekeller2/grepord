[![Build Status](https://travis-ci.org/petekeller2/grepord.svg?branch=master)](https://travis-ci.org/petekeller2/grepord) 
[![dependencies Status](https://david-dm.org/petekeller2/grepord/status.svg)](https://david-dm.org/petekeller2/grepord)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/petekeller2/grepord/LICENSE)
[![npm version](http://img.shields.io/npm/v/grepord.svg?style=flat)](https://npmjs.org/package/grepord)

# About

Use this program to grep for an ordered list of files. Example:
Within a given directory, find the most recently updated files that
contain the text 'hello world'.

# Installation

`npm install -g grepord`

# Usage

`grepord <grep arguments>… [-sort:[<fs.Stats property>][,][(desc|asc)][,][<limit number>]]`

Type `grep -h` to check if grep is installed.

To use this program, you must enter grep arguments that will return file paths. Example: `grepord -iRl './' -e 'hello world'`

You can sort by the properties of fs.Stats. See: https://nodejs.org/api/fs.html#fs_class_fs_stats

The default sort is mtime descending. The format for changing
the sort is -sort: as the last argument, with an optional
fs.Stats property, a comma, an optional desc or asc, a comma and
then an optional limit number (This operates the same way as the
SQL LIMIT clause). Example: `grepord -iRl './' -e 'hello world' -sort:size,asc,10`