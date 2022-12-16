import _ from 'lodash';

const keyOffset = 4;
const spacesCount = 2;
const replacer = ' ';
const label = {
  nested: ' ',
  added: '+',
  removed: '-',
  unchanged: ' ',
};

const addPrefix = (key, type, indent) => `${indent}${label[type]} ${key}`;

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }

  const indentSize = depth * keyOffset;
  const keyIndent = replacer.repeat(indentSize);
  const bracketIndent = replacer.repeat(indentSize - keyOffset);
  const lines = Object
    .entries(value)
    .map(([key, val]) => `${keyIndent}${key}: ${stringify(val, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};

const stylish = (diff) => {
  const iter = (tree, depth) => {
    const indentSize = depth * keyOffset;
    const keyIndent = replacer.repeat(indentSize - spacesCount);
    const bracketIndent = replacer.repeat(indentSize);

    return tree.flatMap((elem) => {
      switch (elem.type) {
        case 'added':
        case 'removed':
        case 'unchanged':
          return `${addPrefix(elem.name, elem.type, keyIndent)}: ${stringify(elem.value, depth + 1)}`;
        case 'updated':
          return [
            `${addPrefix(elem.name, 'removed', keyIndent)}: ${stringify(elem.value1, depth + 1)}`,
            `${addPrefix(elem.name, 'added', keyIndent)}: ${stringify(elem.value2, depth + 1)}`,
          ];
        case 'nested':
          return [
            `${addPrefix(elem.name, elem.type, keyIndent)}: {`,
            ...iter(elem.children, depth + 1),
            `${bracketIndent}}`,
          ];
        default:
          throw new Error('Unknown type node');
      }
    });
  };
  const lines = iter(diff, 1);
  return ['{', ...lines, '}'].join('\n');
};

export default stylish;
