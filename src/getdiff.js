import _ from 'lodash';
import getObject from './parsers.js';

const symbols = {
  unchange: ' ',
  added: '+',
  change: '-',
  indent: '\n',
};

const getDiff = (filepath1, filepath2) => {
  const object1 = getObject(filepath1);
  const object2 = getObject(filepath2);
  const keys = _.union(_.keys(object1), _.keys(object2));
  const uniqSortedkeys = _.sortBy(_.uniq(keys));

  const diffStr = uniqSortedkeys.reduce((acc, elem) => {
    const elemObj1 = `"${elem}": ${object1[elem]}`;
    const elemObj2 = `"${elem}": ${object2[elem]}`;

    if (_.has(object1, elem)) {
      if (object1[elem] === object2[elem]) {
        acc.push(`${symbols.indent} ${symbols.unchange} ${elemObj1}`);
      } else {
        acc.push(`${symbols.indent} ${symbols.change} ${elemObj1}`);
      }
    }

    if (_.has(object2, elem)) {
      if (object1[elem] !== object2[elem]) {
        acc.push(`${symbols.indent} ${symbols.added} ${elemObj2}`);
      }
    }

    return acc;
  }, []);

  return `{${diffStr.join('')}\n}`;
};

export default getDiff;
