import * as fs from 'node:fs';
import { resolve, extname } from 'node:path';
import { cwd } from 'node:process';
import * as yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
};

const getAbsPath = (filepath) => resolve(cwd(), filepath);

const getFile = (absPath) => fs.readFileSync(absPath, 'utf-8');

const getFormatFile = (absPath) => extname(absPath).slice(1);

const getObject = (filepath) => {
  const absPath = getAbsPath(filepath);
  const format = getFormatFile(absPath);
  const parse = parsers[format];

  return parse(getFile(absPath));
};

export default getObject;
