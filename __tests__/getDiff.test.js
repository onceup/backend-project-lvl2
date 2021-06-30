import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import { describe, expect } from '@jest/globals';
import getDiff from '../src/getDiff.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const getFixturePath = (fileName) => path.join(dirname, '..', '__fixtures__', fileName);
const readFile = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf-8');
console.log(readFile('file1.json'));

const result = '- follow: false\nhost: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true';

describe('getDiff', () => {
  test('checking return string', () => {
    const filePath1 = getFixturePath('file1.json');
    const filePath2 = getFixturePath('file2.json');
    expect(getDiff(filePath1, filePath2)).toEqual(result);
  });
});
