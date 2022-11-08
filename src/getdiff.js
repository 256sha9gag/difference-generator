import _ from 'lodash';

const getDiff = (object1, object2) => {
  const keys = _.sortBy(_.union(_.keys(object1), _.keys(object2)));

  return keys.map((key) => {
    const value1 = object1[key];
    const value2 = object2[key];

    if (_.isObject(value1) && _.isObject(value2)) {
      return { name: key, type: 'nested', value: getDiff(value1, value2) };
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
    return { name: key, type: 'change', value: value2 };
  });
};

/*   const diffStr = uniqSortedkeys.reduce((acc, elem) => {
    const elemObj1 = `${elem}: ${object1[elem]}`;
    const elemObj2 = `${elem}: ${object2[elem]}`;

    if (_.has(object1, elem)) {
      if (object1[elem] === object2[elem]) {
        acc.push(`${symbols.indent}  ${symbols.unchange} ${elemObj1}`);
      } else {
        acc.push(`${symbols.indent}  ${symbols.change} ${elemObj1}`);
      }
    }

    if (_.has(object2, elem)) {
      if (object1[elem] !== object2[elem]) {
        acc.push(`${symbols.indent}  ${symbols.added} ${elemObj2}`);
      }
    }

    return acc;
  }, []);

  return `{${diffStr.join('')}\n}`;
}; */

export default getDiff;
