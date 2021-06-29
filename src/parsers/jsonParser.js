import { readFileSync } from 'fs';

export default (filePath) => {
  const fileContent = readFileSync(filePath);
  return JSON.parse(fileContent);
};
