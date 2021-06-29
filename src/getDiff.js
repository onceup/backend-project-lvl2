import _ from 'lodash';
import jsonParser from './parsers/jsonParser.js';

const jsonDiff = (fileName1, fileName2) => {
  const file1 = jsonParser(fileName1);
  const file2 = jsonParser(fileName2);

  const keys = _.union([...Object.keys(file1), ...Object.keys(file2)]).sort();
  const result = keys.map((key) => {
    if (_.has(file1, key) && _.has(file2, key)) {
      return file1[key] === file2[key] ? `${key}: ${file1[key]}` : `- ${key}: ${file1[key]}\n+ ${key}: ${file2[key]}`;
    }
    if (_.has(file1, key) && !_.has(file2, key)) {
      return `- ${key}: ${file1[key]}`;
    }
    if (!_.has(file1, key) && _.has(file2, key)) {
      return `+ ${key}: ${file2[key]}`;
    }
    return '';
  });
  return result.join('\n');
};

export default jsonDiff;
