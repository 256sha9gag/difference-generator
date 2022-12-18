import _ from 'lodash';
import getObject from './parsers.js';
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
  console.log(`formatName ${formatName}`);
  const object1 = getObject(filepath1);
  const object2 = getObject(filepath2);
  switch (formatName) {
    case 'stylish':
      return stylish(genDiff(object1, object2));
    case 'plain':
      return plain(genDiff(object1, object2));
    case 'json':
      return json(genDiff(object1, object2));
    default:
      throw new Error('unknown formatName');
  }
};

export default getDiff;
