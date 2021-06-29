#!/usr/bin/env node

import { Command } from 'commander';
import process from 'process';
import getDiff from '../src/getDiff.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .helpOption('-h, --help', 'output usage information')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((file1, file2) => console.log(getDiff(file1, file2)))
  .parse(process.argv);
