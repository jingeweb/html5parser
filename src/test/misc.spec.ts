/*!
 *
 * Copyright 2017 - acrazing
 *
 * @author acrazing joking.young@gmail.com
 * @since 2017-08-22 22:17:46
 * @version 1.0.0
 * @desc misc.spec.ts
 */

import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';
import { parse } from '../parse';

const tmpDir = path.join(process.cwd(), '.tmp');
execSync(`mkdir -p ${tmpDir}`);

function run(url: string) {
  const id = url.replace(/[^\w\d]+/g, '_').replace(/^_+|_+$/g, '');
  return fetch(url)
    .then((r) => r.text())
    .then((d) => {
      fs.writeFileSync(path.join(tmpDir, `${id}.html`), d);
      console.log('[FETCH:OK]: %s', url);
      console.time('parse:' + url);
      const ast = parse(d);
      console.timeEnd('parse:' + url);
      fs.writeFileSync(path.join(tmpDir, `${id}.json`), JSON.stringify(ast, null, 2));
    })
    .catch((err) => {
      console.error('[ERR]: %s, %s', id, err.message);
    });
}

const scenes = ['http://www.baidu.com/', 'https://www.qq.com/?fromdefault', 'https://www.taobao.com/'];

describe('real scenarios', () => {
  for (const scene of scenes) {
    it(`parse ${scene}`, async () => run(scene));
  }
});
