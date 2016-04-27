/**
 * @copyright 2016-present, Reactdown Team
 * @flow
 */

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import parse from '../index';
import {loadFront as getMeta} from 'yaml-front-matter';

declare function describe(description: string, body: any): void;
declare function it(description: string, body: any): void;

function expectedOutput(name) {
  return fs
    .readFileSync(fixtureFilename(name, 'json'), 'utf8')
    .trim();
}

function fixtureFilename(name, ext) {
  return path.join(__dirname, name) + '.' + ext;
}

function readFixtures(dir) {
  return fs
    .readdirSync(path.join(__dirname, dir))
    .filter(name => /\.md$/.exec(name))
    .map(name => path.join(dir, name.replace(/\.md$/, '')));
}

let config = {
  directives: {
    Plain: {},
    Children: {
      children: 'required',
    },
    ChildrenOptional: {
      children: 'optional',
    },
    Pre: {
      children: 'required-preformatted',
    },
    PreOptional: {
      children: 'optional-preformatted',
    },
    Line: {
      line: 'required',
    },
    LineOptional: {
      line: 'optional',
    },
    Data: {
      data: {type: 'any'}
    },
    DataRequired: {
      data: {type: 'mapping', value: {type: 'any'}}
    },
    DataChildren: {
      data: {type: 'any'},
      children: 'required',
    }
  },
};

function generateCases(dir, only = null) {
  let fixtures = readFixtures(dir);
  fixtures.forEach(fixture => {
    let test = only === fixture ? it.only : it;
    test(`parses ${fixture}`, function() {
      let src = fs.readFileSync(fixtureFilename(fixture, 'md'), 'utf8');
      if (/\.failure/.exec(fixture)) {
        let meta = getMeta(src);
        let message = new RegExp(meta.message);
        assert.throws(() => parse(src, config), message);
      } else {
        let node = parse(src, config);
        assert.equal(JSON.stringify(node, null, 2).trim(), expectedOutput(fixture));
      }
    });
  });
}

describe('reactdown/parse', function() {
  describe('directive', function() {
    generateCases('directive-fixture');
    generateCases('role-fixture');
  });
});
