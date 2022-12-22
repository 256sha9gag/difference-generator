import * as yaml from 'js-yaml';

const parsers = {
  json: (data) => JSON.parse(data),
  yml: (data) => yaml.load(data),
  yaml: (data) => yaml.load(data),
};

export default (data, extName) => parsers[extName](data);
