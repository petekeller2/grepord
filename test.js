import test from 'ava';
import shell from 'shelljs';
import { promisify } from 'util';
const promisifiedExec = promisify(shell.exec);

test('Birth Time Test 1', async t => {
  const results = await promisifiedExec("node index.js -iRl './test' -e 'hello' -sort:birthtime", { silent:true });

  t.is(results.trim(),
    './test/file_four.docx 8/25/2018, 1:02:09 PM\n' +
    './test/file_three.md 8/25/2018, 12:59:37 PM\n' +
    './test/file_two.js 8/25/2018, 12:59:37 PM'
  );
});