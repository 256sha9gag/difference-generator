import { Command } from 'commander';
import getDiff from '../src/getdiff.js';
import getObjs from '../src/getobjs.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const result = getDiff(getObjs(filepath1, filepath2));
    console.log(result);
  })
  .option('-f, --format <type>', 'output format');

export { getDiff, getObjs, program };
