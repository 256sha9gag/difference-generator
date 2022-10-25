import _ from 'lodash';

const symbols = {
  unchange: ' ',
  added: '+',
  change: '-',
  indent: '\n',
};

const getDiff = (objs) => {
  const [obj1, obj2] = objs;
  const keys = Object.keys(obj1).concat(Object.keys(obj2));
  const uniqSortedkeys = _.sortBy(_.uniq(keys));

  const diffStr = uniqSortedkeys.reduce((acc, elem) => {
    const elemObj1 = `"${elem}": ${obj1[elem]}`;
    const elemObj2 = `"${elem}": ${obj2[elem]}`;

    if (_.has(obj1, elem)) {
      if (obj1[elem] === obj2[elem]) {
        acc.push(`${symbols['indent']} ${symbols['unchange']} ${elemObj1}`);
      }
      if (obj1[elem] !== obj2[elem]) {
        acc.push(`${symbols['indent']} ${symbols['change']} ${elemObj1}`);  
      }
    }
  
    if (_.has(obj2, elem)) {
      if (obj1[elem] !== obj2[elem]) {
        acc.push(`${symbols['indent']} ${symbols['added']} ${elemObj2}`);
      }
    }

    return acc;
  }, []);

  return `{${diffStr.join('')}\n}`;
};

export default getDiff;