import _ from 'lodash';
import getObject from './parsers.js';
import stylish from './formatters/stylish.js';

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
      return { name: key, type: 'deleted', value: value1 };
    }
    if (value1 === value2) {
      return { name: key, type: 'unchange', value: value1 };
    }
    return {
      name: key, type: 'changed', value1, value2,
    };
  });
  return result;
};

const getDiff = (filepath1, filepath2) => {
  const object1 = getObject(filepath1);
  const object2 = getObject(filepath2);
  return stylish(genDiff(object1, object2));
};

export default getDiff;
