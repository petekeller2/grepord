`grepord <grep arguments>… [-sort:[<fs.Stats property>][,][(desc|asc)][,][<limit number>]]`

Grep needs to be installed. To use this program, you must enter a grep command that will return file paths. Example: `grepord -iRl './' -e 'hello world'`

You can sort by the properties of fs.Stats. See: https://nodejs.org/api/fs.html#fs_class_fs_stats

The default sort is mtime descending. The format for changing
the sort is -sort: as the last argument, with an optional
fs.Stats property, a comma, an optional desc or asc, a comma and
then an optional limit number (This operates the same way as the
SQL LIMIT clause). Example: `grepord -iRl './' -e 'hello world' -sort:size,asc,10`