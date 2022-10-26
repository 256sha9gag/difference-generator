import * as fs from 'node:fs';
import { resolve } from 'node:path';
import { cwd } from 'node:process';

const getFiles = (filepath1, filepath2) => {
  const file1 = fs.readFileSync(resolve(cwd(), filepath1));
  const file2 = fs.readFileSync(resolve(cwd(), filepath2));

  return [file1, file2];
};

const getObjs = (absPaths) => {
  const [file1, file2] = absPaths;
  const objFile1 = JSON.parse(file1);
  const objFile2 = JSON.parse(file2);

  return [objFile1, objFile2];
};

export { getFiles, getObjs };
