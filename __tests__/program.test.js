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

const expectFloatStylish = readFile('expect_float.txt');

const expectNestedStylish = readFile('expect_nested.txt');

const expectNestedPlain = readFile('expect_plain.txt');

test('getdiff stylish float.json', () => {
  expect(getDiff(getFixturePath('float_file1.json'), getFixturePath('float_file2.json'), 'stylish')).toEqual(expectFloatStylish);
});

test('getdiff stylish float.yml', () => {
  expect(getDiff(getFixturePath('float_file1.yml'), getFixturePath('float_file2.yml'), 'stylish')).toEqual(expectFloatStylish);
});

test('getdiff stylish nested.json', () => {
  expect(getDiff(getFixturePath('nested_file1.json'), getFixturePath('nested_file2.json'), 'stylish')).toEqual(expectNestedStylish);
});

test('getdiff stylish nested.yml', () => {
  expect(getDiff(getFixturePath('nested_file1.yml'), getFixturePath('nested_file2.yml'), 'stylish')).toEqual(expectNestedStylish);
});

test('getdiff plain nested.json', () => {
  expect(getDiff(getFixturePath('nested_file1.json'), getFixturePath('nested_file2.json'), 'plain')).toEqual(expectNestedPlain);
});

test('getdiff plain nested.yml', () => {
  expect(getDiff(getFixturePath('nested_file1.yml'), getFixturePath('nested_file2.yml'), 'plain')).toEqual(expectNestedPlain);
});
