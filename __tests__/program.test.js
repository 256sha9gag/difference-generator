import * as path from 'path';
import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as fs from 'node:fs';
import getDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectFloat = readFile('expect_float.txt');
console.log(typeof expectFloat);

const expectNested = readFile('expect_nested.txt');
console.log(typeof expectFloat);

test('getdiff float json', () => {
  expect(getDiff(getFixturePath('float_file1.json'), getFixturePath('float_file2.json'))).toEqual(expectFloat);
});

test('getdiff float yml', () => {
  expect(getDiff(getFixturePath('float_file1.yml'), getFixturePath('float_file2.yml'))).toEqual(expectFloat);
});

test('getdiff nested json', () => {
  expect(getDiff(getFixturePath('nested_file1.json'), getFixturePath('nested_file2.json'))).toEqual(expectNested);
});

test('getdiff nested yml', () => {
  expect(getDiff(getFixturePath('nested_file1.yml'), getFixturePath('nested_file2.yml'))).toEqual(expectNested);
});
