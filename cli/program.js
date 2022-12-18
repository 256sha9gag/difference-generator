import { Command } from 'commander';
import getDiff from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const formatName = program.opts().format;
    const result = getDiff(filepath1, filepath2, formatName);
    console.log(result);
  })
  .option('-f, --format <type>', 'output format', 'stylish');

export default program;
