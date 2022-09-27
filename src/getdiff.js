import _ from 'lodash';

const getDiff = (objs) => {
  const [objFile1, objFile2] = objs;
  const concatKeys = _.sortBy(_.uniq(Object.keys(objFile1).concat(Object.keys(objFile2))));

  const diffStr = concatKeys.reduce((acc, elem) => {
    if (_.has(objFile1, elem) && _.has(objFile2, elem)) {
      if (objFile1[elem] === objFile2[elem]) {
        acc.push(`\n    "${elem}": ${objFile1[elem]}`);
      }
      if (objFile1[elem] !== objFile2[elem]) {
        acc.push(`\n  - "${elem}": ${objFile1[elem]}`);
        acc.push(`\n  + "${elem}": ${objFile2[elem]}`);
      }
    }

    if (_.has(objFile1, elem) && !_.has(objFile2, elem)) {
      acc.push(`\n  - "${elem}": ${objFile1[elem]}`);
    }

    if (!_.has(objFile1, elem) && _.has(objFile2, elem)) {
      acc.push(`\n  + "${elem}": ${objFile2[elem]}`);
    }

    return acc;
  }, []);

  return `{${diffStr.join('')}\n}`;
};

export default getDiff;
