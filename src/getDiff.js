import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import jsonParser from './parsers/jsonParser.js';

const getFullPath = (filePath) => path.resolve(process.cwd(), filePath);
const readFile = (filePath) => fs.readFileSync(getFullPath(filePath), 'utf-8');

const getDiff = (fileName1, fileName2) => {
  const file1 = jsonParser(readFile(fileName1));
  const file2 = jsonParser(readFile(fileName2));

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

export default getDiff;
