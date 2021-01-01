import test from 'ava';
import shell from 'shelljs';
import pjson from './package.json';
import { promisify } from 'util';
const promisifiedExec = promisify(shell.exec);

test('Birth Time Test', async t => {
  const results = await promisifiedExec("node index.js -iRl './test' -e 'hello' -sort:birthtime", { silent:true });

  t.is(results.trim(),
    './test/file_four.docx 8/25/2018, 1:02:09 PM\n' +
    './test/file_three.md 8/25/2018, 12:59:37 PM\n' +
    './test/file_two.js 8/25/2018, 12:59:37 PM'
  );
});

test('Size Test', async t => {
  const results = await promisifiedExec("node index.js -iRl './test' -e 'world' -sort:size", { silent:true });

  t.is(results.trim(),
    './test/file_two.js 27 B\n' +
    './test/file_one.txt 14 B'
  );
});

test('Limit Test', async t => {
  const results = await promisifiedExec("node index.js -iRl './test' -e 'hello' -sort:birthtime,,2", { silent:true });

  t.is(results.trim(),
    './test/file_four.docx 8/25/2018, 1:02:09 PM\n' +
    './test/file_three.md 8/25/2018, 12:59:37 PM'
  );
});

test('Asc Test', async t => {
  const results = await promisifiedExec("node index.js -iRl './test' -e 'hello' -sort:birthtime,asc", { silent:true });

  t.is(results.trim(),
    './test/file_three.md 8/25/2018, 12:59:37 PM\n' +
    './test/file_two.js 8/25/2018, 12:59:37 PM\n' +
    './test/file_four.docx 8/25/2018, 1:02:09 PM'
  );
});

test('Version Test', async t => {
  const results = await promisifiedExec("node index.js -V", { silent:true });

  t.is(results.trim(), pjson.version);
});

test('birthtimeMs Test', async t => {
  const results = await promisifiedExec("node index.js -iRl './test' -e 'hello' -sort:birthtimeMs", { silent:true });

  t.is(results.trim(),
    './test/file_four.docx 1535216529000\n' +
    './test/file_three.md 1535216377000\n' +
    './test/file_two.js 1535216377000'
  );
});

test('Custom Sort Test', async t => {
  const results = await promisifiedExec("node index.js -iRl './test' -e 'hello' -sort:birthtimeMs,asc,1", { silent:true });

  t.is(results.trim(),
    './test/file_three.md 1535216377000'
  );
});

test('No Limit Test', async t => {
  const results = await promisifiedExec("node index.js -iRl './test' -e 'hello' -sort:birthtimeMs,,0", { silent:true });

  t.is(results.trim(),
    './test/file_four.docx 1535216529000\n' +
    './test/file_three.md 1535216377000\n' +
    './test/file_two.js 1535216377000'
  );
});

test('Default Sort Test', async t => {
  const results = await promisifiedExec("node index.js -iRl './test' -e 'hello'", { silent:true });

  t.is(results.trim(),
    './test/file_four.docx 8/25/2018, 1:03:51 PM\n' +
    './test/file_three.md 8/25/2018, 12:59:37 PM\n' +
    './test/file_two.js 8/25/2018, 12:59:37 PM'
  );
});

test('UID Sort Test', async t => {
  const results = await promisifiedExec("node index.js -iRl './test' -e 'hello' -sort:uid", { silent:true });

  t.is(results.trim(),
    './test/file_four.docx 501\n' +
    './test/file_three.md 501\n' +
    './test/file_two.js 501'
  );
});
