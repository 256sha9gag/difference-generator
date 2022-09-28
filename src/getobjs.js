import * as fs from 'node:fs';
import { resolve } from 'node:path';
import { cwd } from 'node:process';

const getObjs = (filepath1, filepath2) => {
  const AbsPathFile1 = resolve(cwd(), filepath1);
  const AbsPathFile2 = resolve(cwd(), filepath2);

  const objFile1 = JSON.parse(fs.readFileSync(AbsPathFile1));
  const objFile2 = JSON.parse(fs.readFileSync(AbsPathFile2));

  return [objFile1, objFile2];
};

export default getObjs;
