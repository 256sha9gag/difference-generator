import _ from 'lodash';
import { getAbsPath, getFile, getFormatFile } from './getData.js';
import parse from './parsers.js';
import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';
import json from './formatters/json.js';

const genDiff = (object1, object2) => {
  const keys = _.sortBy(_.union(_.keys(object1), _.keys(object2)));

  const result = keys.map((key) => {
    const value1 = object1[key];
    const value2 = object2[key];

    if (_.isObject(value1) && _.isObject(value2)) {
      return { name: key, type: 'nested', children: genDiff(value1, value2) };
    }
    if (!_.has(object1, key)) {
      return { name: key, type: 'added', value: value2 };
    }
    if (!_.has(object2, key)) {
      return { name: key, type: 'removed', value: value1 };
    }
    if (value1 === value2) {
      return { name: key, type: 'unchanged', value: value1 };
    }
    return {
      name: key, type: 'updated', value1, value2,
    };
  });
  return result;
};

const getDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const absPathFile1 = getAbsPath(filepath1);
  const absPathFile2 = getAbsPath(filepath2);
  const dataFile1 = parse(getFile(absPathFile1), getFormatFile(absPathFile1));
  const dataFile2 = parse(getFile(absPathFile2), getFormatFile(absPathFile2));

  switch (formatName) {
    case 'stylish':
      return stylish(genDiff(dataFile1, dataFile2));
    case 'plain':
      return plain(genDiff(dataFile1, dataFile2));
    case 'json':
      return json(genDiff(dataFile1, dataFile2));
    default:
      throw new Error('unknown formatName');
  }
};

export default getDiff;
