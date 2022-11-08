import getObject from './src/parsers.js';
import getDiff from './src/getdiff.js';

const genDiff = (filepath1, filepath2) => {
  const object1 = getObject(filepath1);
  const object2 = getObject(filepath2);
  console.log(JSON.stringify(getDiff(object1, object2), null, '  '));
};

export default genDiff;
