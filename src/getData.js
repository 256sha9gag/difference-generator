import * as fs from 'node:fs';
import { resolve, extname } from 'node:path';
import { cwd } from 'node:process';

const getAbsPath = (filepath) => resolve(cwd(), filepath);

const getFile = (absPath) => fs.readFileSync(absPath, 'utf-8');

const getFormatFile = (absPath) => extname(absPath).slice(1);

export { getAbsPath, getFile, getFormatFile };
