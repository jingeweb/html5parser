/*
 * @since 2020-09-09 22:43:03
 * @author acrazing <joking.young@gmail.com>
 */

import { parse } from '../parse';
import { dropLoc, tag, text } from './parse.spec';

describe('issue #7', () => {
  it('should parse comment as expected', () => {
    // FIXME: 去除 dropLoc
    expect(dropLoc(parse('<!-- it is comment -->\n-\n'))).toEqual(
      dropLoc([
        tag('<!-- it is comment -->', '!--', text('<!--', 0), [], [text(' it is comment ')], text('-->'), 0),
        text('\n-\n'),
      ]),
    );
  });
});
