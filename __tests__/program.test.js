import * as path from 'path';
import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as fs from 'node:fs';
import getDiff from '../src/getdiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('getdiff json', () => {
  expect(readFile('expect_float.txt')).toBe(getDiff(getFixturePath('float_file1.json'), getFixturePath('float_file2.json')));
});

test('getdiff yml', () => {
  expect(readFile('expect_float.txt')).toBe(getDiff(getFixturePath('float_file1.yml'), getFixturePath('float_file2.yml')));
});
