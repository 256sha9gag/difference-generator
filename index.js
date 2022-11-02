const trim = (str) => str.trim();

const stringify = (value, replacer = ' ', spaceCount = 1, lvl = 1) => {
  if (typeof value === 'object') {
    const keys = Object.keys(value);
    const arrayValue = keys.reduce((acc, key) => {
      if (typeof value[key] !== 'object' || value[key] === null) {
        acc.push(`${replacer.repeat(spaceCount * lvl)}${String(key)}: ${String(value[key])}\n`);
      } else {
        acc.push(`${replacer.repeat(spaceCount * lvl)}${String(key)}: `);
        acc = [...acc, stringify(value[key], replacer, spaceCount, lvl + 1)];
      }
      return acc;
    }, []);
    const res = `{\n${arrayValue.join('')}${replacer.repeat(spaceCount * (lvl - 1))}}\n`;

    return res;
  }

  return String(value);
}

export default stringify;

const nested = {
  string: 'value',
  boolean: true,
  number: 5,
  float: 1.25,
  object: {
    5: 'number',
    1.25: 'float',
    null: 'null',
    true: 'boolean',
    value: 'string',
    nested: {
      boolean: true,
      float: 1.25,
      string: 'value',
      number: 5,
      null: null,
    },
  },
};

console.log(stringify(nested, '-', 3));
